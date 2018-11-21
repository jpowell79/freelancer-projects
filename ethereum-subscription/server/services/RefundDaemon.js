const {Op} = require("sequelize");
const SubscriptionContract = require("../../services/smart-contracts/SubscriptionContract");
const Emailer = require("./email/Emailer");

class RefundDaemon {
    constructor(settings, sequelize){
        this.interval = 1000 * 60 * settings.interval.minutes;
        this.refundTime = 1000 * 60 * 60 * settings.refundSubscriptionsOlderThan.hours;
        this.sequelize = sequelize;
        this.emailer = new Emailer();
    }

    async findNotRefundedSubscriptionsOlderThan(milliseconds){
        return this.sequelize.models.subscriptions
            .findAll({
                where: {
                    createdAt: {[Op.lt]: new Date(new Date() - milliseconds)}
                }
            }).then(subscriptions => subscriptions
                .map(subscription => subscription.dataValues)
                .filter(subscription => !subscription.hasSentRefundEmail)
            );
    }

    async findSubscriptionContracts(subscriptions){
        return Promise.all(subscriptions.map(subscription => {
            return this.sequelize.models.subscriptionContracts
                .findOne({
                    where: {id: subscription.contractId}
                }).then(subscription => subscription.dataValues);
        }));
    }

    async findContractsToRefund(subscriptionContracts){
        return Promise.all(subscriptionContracts.map(contract => {
            return new SubscriptionContract({
                web3: global.web3,
                address: contract.address
            }).fetchSubscriptionData()
                .then(subscription => {
                    if(
                        !subscription.subscriptionActive &&
                        !subscription.trialActive &&
                        !subscription.subscriptionCancelled
                    ){
                        return contract;
                    }

                    return null;
                });
        })).then(contracts => contracts.filter(contract => contract));
    }

    async findSubscribersToRefund(contractsToRefund, subscriptions){
        const subscriptionToRefund = subscriptions.filter(subscription =>
            contractsToRefund.find(contract => contract.id === subscription.contractId)
        ).map(subscription => contractsToRefund
            .filter(contract => contract.id === subscription.contractId)
            .map(contract => ({
                contractAddress: contract.address,
                subscriptionId: subscription.id,
                subscriberId : subscription.subscriberId,
                supplier: contract.ownerUsername
            }))[0]
        );

        return Promise.all(subscriptionToRefund.map(subscription => this.sequelize
            .models
            .subscribers
            .findOne({
                where: {id: subscription.subscriberId}
            }).then(subscriber => ({
                subscriberEmail: subscriber.dataValues.email,
                ...subscription
            }))
        ));
    }

    async findSuppliersToNotify(subscriberContracts){
        return Promise.all(subscriberContracts.map(subscriberContract => this.sequelize
            .models
            .users
            .findOne({
                where: {username: subscriberContract.supplier}
            }).then(supplier => ({
                supplierEmail: supplier.dataValues.email,
                ...subscriberContract
            }))
        ));
    }

    async findSubscriptionsEligibleForRefund(){
        let subscriptions = [];

        return this.findNotRefundedSubscriptionsOlderThan(this.refundTime)
            .then(oldSubscriptions => {
                subscriptions = oldSubscriptions;
                return this.findSubscriptionContracts(subscriptions);
            })
            .then(subscriptionContracts => this.findContractsToRefund(subscriptionContracts))
            .then(contracts => this.findSubscribersToRefund(contracts, subscriptions))
            .then(subscriberContracts => this.findSuppliersToNotify(subscriberContracts));
    }

    async sendMails(subscriptions){
        return Promise.all(subscriptions.map(subscription => (
            this.emailer.sendRefundAvailableMails(subscription)
        ))).then((transportInfo) => {
            if(isDevelopment()){
                console.log(transportInfo);
            }
        });
    }

    async setHasSentRefundEmail(subscriptions){
        return Promise.all(subscriptions.map(subscription => (
            this.sequelize.models.subscriptions.update(
                {hasSentRefundEmail: true},
                {where: {id: subscription.subscriptionId}}
            )
        )));
    }

    start(){
        this.timer = setInterval(async () => {
            if(isDevelopment()){
                console.log("Refund Daemon:");
            }
            let subscriptions = await this.findSubscriptionsEligibleForRefund();
            await this.sendMails(subscriptions);
            await this.setHasSentRefundEmail(subscriptions);
        }, this.interval);
    }

    kill(){
        clearInterval(this.timer);
    }
}

module.exports = RefundDaemon;