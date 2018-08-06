const {httpCodes} = require('../../../services/constants/index');
const {getAllModelEntries} = require('./apiUtils');
const {
    SUCCESS,
    BAD_REQUEST,
    SOMETHING_WENT_WRONG
} = httpCodes;

function SubscriptionContracts({req, res, sequelize}){
    this.model = sequelize.models.subscriptionContracts;
    this.subscriptionTypesModel = sequelize.models.subscriptionTypes;

    this.sendGetAll = async () => getAllModelEntries(res, this.model);

    this.sendJoinedGetAll = async () => {
        return this.model
            .findAll({
                include: [this.subscriptionTypesModel]
            })
            .then(entries => entries.map(entry => entry.dataValues))
            .then(entries => {
                res.send(entries);
            })
            .catch(err => {
                if(global.isDevelopment()) console.error(err);
                res.sendStatus(SOMETHING_WENT_WRONG);
            });
    };

    this.sendCreate = async (contract) => {
        this.subscriptionTypesModel.findOne({where: {name: contract.typeName}})
            .then(typeEntry => typeEntry.dataValues)
            .then(type => this.model.create(
                Object.assign({}, contract, {typeId: type.id})
            ))
            .then(() => {
                res.sendStatus(SUCCESS);
            })
            .catch(err => {
                if(global.isDevelopment()) console.error(err);
                res.sendStatus(BAD_REQUEST);
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