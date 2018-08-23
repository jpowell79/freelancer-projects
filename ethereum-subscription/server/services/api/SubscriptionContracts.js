const {getAllModelEntries} = require('./apiUtils');
const {isLoggedInAdmin} = require('../../../services/session');

function SubscriptionContracts({req, sequelize, responseHandler}){
    this.model = sequelize.models.subscriptionContracts;
    this.subscriptionTypesModel = sequelize.models.subscriptionTypes;

    this.sendGetAll = async () => getAllModelEntries(responseHandler, this.model);

    this.sendJoinedGetAll = async () => {
        return this.model
            .findAll({
                include: [this.subscriptionTypesModel]
            })
            .then(entries => entries.map(entry => entry.dataValues))
            .then(entries => {
                responseHandler.sendSuccess(entries);
            })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
            });
    };

    this.sendUpdate = async () => {
        const {address} = req.body;
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!address){
            return responseHandler.sendBadRequest('Missing required fields');
        }

        return this.model.findOne({where: {address}})
            .then(contractEntry => {
                if(!contractEntry) throw new Error('Contract does not exists');
                if(req.session.user.username !== contractEntry.dataValues.ownerUsername
                    && !loggedInAdmin) throw new Error('Unauthorized');

                return this.model.update(req.body, {where: {address}});
            }).then(res => {
                responseHandler.sendSuccess(res);
            })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
            });
    };

    this.sendCreate = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        const contract = req.body;

        return this.model.create(contract)
            .then(() => {
                responseHandler.sendCreated();
            })
            .catch(err => {
                responseHandler.sendBadRequest(err);
            })
    };

    this.create = (contract) => {
        return this.subscriptionTypesModel
            .findOne({
                where: {
                    name: contract.typeName
                }
            })
            .then(typeEntry => typeEntry.dataValues)
            .then(type => this.model.create(
                Object.assign({}, contract, {typeId: type.id})
            ));
    };
}

module.exports = SubscriptionContracts;