const {urls, mailTypes, httpCodes} = require('../../services/constants');
const mail = require('../services/api/mail');
const {isLoggedIn, isLoggedInAdmin} = require('../../services/session');
const {standardResponseHandler} = require('../services/api/apiUtils');
const {
    UNAUTHORIZED,
    BAD_REQUEST,
    METHOD_NOT_ALLOWED,
} = httpCodes;

const handlePost = async (req, res, sequelize) => {
    if(!mailTypes.includes(req.params.type)){
        res.sendStatus(BAD_REQUEST);
        return;
    }

    const loggedIn = await isLoggedIn(req);

    if(!loggedIn){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    switch(req.params.type){
    case mailTypes.confirmationMail:
        return standardResponseHandler(res, mail.sendConfirmEmail(req));
    case mailTypes.contractCreated:
        return standardResponseHandler(res, mail.sendContractCreatedMail(req));
    case mailTypes.requestContract:
        return standardResponseHandler(res, mail.sendContractRequestMail(req));
    case mailTypes.massMailSuppliers:
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            res.sendStatus(401);
            return;
        }

        return standardResponseHandler(res, mail.sendMassSupplierMail(req, sequelize));
    default:
        res.sendStatus(BAD_REQUEST);
        break;
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.email}/:type`, server.initSession, (req, res) => {
        switch (req.method){
        case "POST":
            handlePost(req, res, sequelize);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};