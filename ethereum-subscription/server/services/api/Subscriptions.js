const {getAllModelEntries} = require('./apiUtils');
const ResponseHandler = require('./ResponseHandler');

function SubscriptionContracts({req, res, sequelize}){
    const responseHandler = new ResponseHandler(res);
    this.model = sequelize.models.subscriptions;
    this.subscriptionContractsModel = sequelize.models.subscriptionContracts;
    this.subscribersModel = sequelize.models.subscribers;
    this.subscriptionTypesModel = sequelize.models.subscriptionTypes;

    this.sendGetAll = async () => getAllModelEntries(responseHandler, this.model);

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
            .then(entries => { responseHandler.sendSuccess(entries); })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
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