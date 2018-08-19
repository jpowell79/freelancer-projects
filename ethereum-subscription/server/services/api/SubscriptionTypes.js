const {isLoggedInAdmin} = require('../../../services/session');
const {getAllModelEntries} = require('./apiUtils');

function SubscriptionTypes({req, sequelize, responseHandler}){
    this.model = sequelize.models.subscriptionTypes;

    this.create = ({name}) => {
        return this.model.create({name});
    };

    this.update = ({id, name}) => {
        return this.model.update({name}, {where: {id}});
    };

    this.sendGetAll = async () => getAllModelEntries(responseHandler, this.model);

    this.sendUpdate = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        const {name, id} = req.body;

        if(!name || !id){
            return responseHandler.sendBadRequest('Subscription Type and Id is required.');
        }

        return this.update({name, id})
            .then(() => {
                responseHandler.sendSuccess();
            })
            .catch(err => {
                responseHandler.sendBadRequest(err);
            });
    };

    this.sendCreate = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        const {name} = req.body;

        if(!name){
            return responseHandler.sendBadRequest('Name is required');
        }

        return this.create({name})
            .then(() => {
                responseHandler.sendCreated();
            })
            .catch(err => {
                responseHandler.sendBadRequest(err);
            });
    }
}

module.exports = SubscriptionTypes;