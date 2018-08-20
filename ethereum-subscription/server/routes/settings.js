const {urls} = require('../../services/constants/');
const strings = require('../../services/strings');
const {isLoggedInAdmin} = require('../../services/session');
const ResponseHandler = require('../services/api/ResponseHandler');

function SettingsRequest({req, sequelize, responseHandler}){
    this.handleGet = () => {
        const name = req.params.name;

        if(!strings.isDefined(name)){
            return sequelize.models.settings
                .findAll()
                .then(settings => responseHandler.sendSuccess(settings))
                .catch(err => responseHandler.sendSomethingWentWrong(err));
        }

        return sequelize.models.settings
            .findOne({where: {name}})
            .then(setting => {
                if(!setting) throw new Error("No setting with the given name exists.");
                responseHandler.sendSuccess(setting)
            })
            .catch(err => responseHandler.sendNotFound(err));
    };

    this.handlePost = async () => {
        const {
            name,
            value,
            update
        } = req.body;

        if(!strings.isDefined(name)){
            return responseHandler.sendBadRequest('Setting name is required');
        }

        //TODO: Give suppliers access to certain settings?
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        if(update){
            return sequelize.models.settings
                .update({name, value}, {where: {name}})
                .then(affectedRows => {
                    if(affectedRows[0] === '0' || affectedRows[0] === 0)
                        throw new Error("No setting with the given name exists.");

                    responseHandler.sendSuccess(affectedRows);
                })
                .catch(err => {
                    responseHandler.sendBadRequest(err);
                });
        } else {
            return sequelize.models.settings
                .create({name, value})
                .then(() => {
                    responseHandler.sendSuccess();
                })
                .catch(err => {
                    responseHandler.sendBadRequest(err);
                });
        }
    };
}

module.exports = (server, sequelize) => {
    server.use(`${urls.settings}/:name?`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const settingsRequest = new SettingsRequest({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return settingsRequest.handleGet();
        case "POST":
            return settingsRequest.handlePost();
        default:
            return responseHandler.sendMethodNotAllowed();
        }
    });
};