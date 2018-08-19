const {urls, mailTypes} = require('../../services/constants');
const mail = require('../services/api/mail');
const {isLoggedIn, isLoggedInAdmin} = require('../../services/session');
const ResponseHandler = require('../services/api/ResponseHandler');

function EmailRequest({req, sequelize, responseHandler}){
    const sendMail = async () => {
        const mailType = req.params.type;

        if(!mailTypes.includes(mailType)){
            return responseHandler.sendBadRequest(`Invalid email type: ${req.params.type}`);
        }

        switch(mailType){
        case mailTypes.confirmationMail:
            return responseHandler.handlePromiseResponse(mail.sendConfirmEmail(req));
        case mailTypes.contractCreated:
            return responseHandler.handlePromiseResponse(mail.sendContractCreatedMail(req));
        case mailTypes.requestContract:
            return responseHandler.handlePromiseResponse(mail.sendContractRequestMail(req));
        case mailTypes.massMailSuppliers:
            const loggedInAdmin = await isLoggedInAdmin(req);

            if(!loggedInAdmin){
                return responseHandler.sendUnauthorized();
            }

            return responseHandler.handlePromiseResponse(mail.sendMassSupplierMail(req, sequelize));
        default:
            responseHandler.sendBadRequest(`Invalid email type: ${req.params.type}`);
            break;
        }
    };

    this.handlePost = async () => {
        const loggedIn = await isLoggedIn(req);

        if(!loggedIn){
            return responseHandler.sendUnauthorized();
        }

        return sendMail();
    };
}

module.exports = (server, sequelize) => {
    server.use(`${urls.email}/:type`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const emailRequest = new EmailRequest({req, sequelize, responseHandler});

        switch (req.method){
        case "POST":
            return emailRequest.handlePost();
        default:
            return responseHandler.sendMethodNotAllowed();
        }
    });
};