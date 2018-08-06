const {httpCodes} = require('../../../services/constants/index');
const {getAllModelEntries} = require('./apiUtils');
const {
    SOMETHING_WENT_WRONG
} = httpCodes;

function SubscriptionContracts({req, res, sequelize}){
    this.model = sequelize.models.subscriptions;
    this.subscriptionContractsModel = sequelize.models.subscriptionContracts;
    this.subscribersModel = sequelize.models.subscribers;
    this.subscriptionTypesModel = sequelize.models.subscriptionTypes;

    this.sendGetAll = async () => getAllModelEntries(res, this.model);

    this.sendJoinedGetAll = () => {
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
            .then(entries => { res.send(entries); })
            .catch(err => {
                if(global.isDevelopment()) console.error(err);
                res.sendStatus(SOMETHING_WENT_WRONG);
            });
    };

    this.create = ({contractAddress, subscriberAddress}) => {
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
                    contractId: subscriptionContract.id
                })
            );
    }
}

module.exports = SubscriptionContracts;