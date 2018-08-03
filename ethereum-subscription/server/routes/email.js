const {urls, mailTypes} = require('../../services/constants');
const mail = require('../services/mail');
const {isLoggedIn} = require('../../services/session');
const {standardResponseHandler} = require('../services/apiUtils');

const handlePost = async (req, res) => {
    if(!mailTypes.includes(req.params.type)){
        res.sendStatus(400);
        return;
    }

    const loggedIn = await isLoggedIn(req);

    if(!loggedIn){
        res.sendStatus(401);
        return;
    }

    switch(req.params.type){
    case mailTypes.confirmationMail:
        return standardResponseHandler(res, mail.sendConfirmEmail(req));
    case mailTypes.contractCreated:
        return standardResponseHandler(res, mail.sendContractCreatedMail(req));
    default:
        res.sendStatus(400);
        break;
    }
};

module.exports = (server) => {
    server.use(`${urls.email}/:type`, server.initSession, (req, res) => {
        switch (req.method){
        case "POST":
            handlePost(req, res);
            break;
        default:
            res.sendStatus(405);
            break;
        }
    });
};