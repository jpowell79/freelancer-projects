const {getAllModelEntries} = require('./apiUtils');
const {isLoggedIn} = require('../../../services/session');

class Subscriptions {
    constructor({req, sequelize, responseHandler}){
        this.req = req;
        this.responseHandler = responseHandler;
        this.model = sequelize.models.subscriptions;
        this.subscriptionContractsModel = sequelize.models.subscriptionContracts;
        this.subscribersModel = sequelize.models.subscribers;
        this.subscriptionTypesModel = sequelize.models.subscriptionTypes;
        this.subscriptionsModel = sequelize.models.subscriptions;
    }

    async sendGetAll(){
        return getAllModelEntries(this.responseHandler, this.model);
    }

    async sendJoinedGetAll(){
        return this.subscribersModel
            .findAll({
                include: [
                    {
                        model: this.subscriptionContractsModel,
                        through: {
                            attributes: ['id']
                        },
                        include: [{
                            model: this.subscriptionTypesModel
                        }]
                    }
                ]
            })
            .then(entries => entries.map(entry => entry.dataValues))
            .then(entries => this.responseHandler.sendSuccess(entries))
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    };

    async sendDelete(){
        const {subscriptionId} = this.req.body;

        const loggedIn = await isLoggedIn(this.req);

        if(!loggedIn) return this.responseHandler.sendUnauthorized();

        return this.subscriptionsModel
            .findOne({where: {id: subscriptionId}})
            .then(subscriptionsEntry => subscriptionsEntry.dataValues)
            .then(subscription => this.subscriptionContractsModel.findOne({
                where: {
                    id: subscription.contractId
                }
            }))
            .then(subscriptionContractEntry => subscriptionContractEntry.dataValues)
            .then(subscriptionContract => {
                if(subscriptionContract.ownerUsername !== this.req.session.user.username){
                    return this.responseHandler.sendUnauthorized();
                }

                return this.subscriptionsModel
                    .destroy({where: {id: subscriptionId}})
                    .then(() => this.responseHandler.sendSuccess())
                    .catch(err => this.responseHandler.sendSomethingWentWrong(err))
            })
            .catch(err => this.responseHandler.sendBadRequest(err));
    };

    async sendCreate(){
        return this.create(this.req.body)
            .then(data => this.responseHandler.sendSuccess(data))
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    };

    async create({contractAddress, subscriberAddress, transactionHash}){
        let subscriptionContract;

        return this.subscriptionContractsModel
            .findOne({
                where: {
                    address: contractAddress
                }
            })
            .then(contractEntry => contractEntry.dataValues)
            .then(contract => {subscriptionContract = contract;})
            .then(() => this.subscribersModel
                .findOne({
                    where: {
                        walletAddress: subscriberAddress
                    }
                })
            )
            .then(subscriberEntry => subscriberEntry.dataValues)
            .then(subscriber => this.model
                .create({
                    subscriberId: subscriber.id,
                    contractId: subscriptionContract.id,
                    transactionHash
                })
            );
    }
}

module.exports = Subscriptions;