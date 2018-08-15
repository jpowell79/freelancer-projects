const {urls, mailTypes} = require('../../services/constants');
const mail = require('../services/api/mail');
const {isLoggedIn, isLoggedInAdmin} = require('../../services/session');
const ResponseHandler = require('../services/api/ResponseHandler');

const handlePost = async (req, res, sequelize, responseHandler) => {
    if(!mailTypes.includes(req.params.type)){
        return responseHandler.sendBadRequest(`Invalid email type: ${req.params.type}`);
    }

    const loggedIn = await isLoggedIn(req);

    if(!loggedIn){
        return responseHandler.sendUnauthorized();
    }

    switch(req.params.type){
    case mailTypes.confirmationMail:
        return responseHandler.handleResponse(mail.sendConfirmEmail(req));
    case mailTypes.contractCreated:
        return responseHandler.handleResponse(mail.sendContractCreatedMail(req));
    case mailTypes.requestContract:
        return responseHandler.handleResponse(mail.sendContractRequestMail(req));
    case mailTypes.massMailSuppliers:
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        return responseHandler.handleResponse(mail.sendMassSupplierMail(req, sequelize));
    default:
        responseHandler.sendBadRequest(`Invalid email type: ${req.params.type}`);
        break;
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.email}/:type`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);

        switch (req.method){
        case "POST":
            handlePost(req, res, sequelize, responseHandler);
            break;
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    });
};