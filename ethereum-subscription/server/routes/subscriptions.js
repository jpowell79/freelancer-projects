const {urls} = require('../../services/constants/');
const SubscriptionTypes = require('../services/api/SubscriptionTypes');
const SubscriptionContracts = require('../services/api/SubscriptionContracts');
const Subscriptions = require('../services/api/Subscriptions');
const Subscribers = require('../services/api/Subscribers');
const ResponseHandler = require('../services/api/ResponseHandler');

const handleSubscriptionsRequest = (req, res, sequelize, responseHandler) => {
    const subscriptions = new Subscriptions({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptions.sendGetAll();
    default:
        responseHandler.sendMethodNotAllowed();
        break;
    }
};

const handleContractsRequest = (req, res, sequelize, responseHandler) => {
    const subscriptionContracts = new SubscriptionContracts({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptionContracts.sendGetAll();
    case "POST":
        return subscriptionContracts.sendCreate();
    default:
        responseHandler.sendMethodNotAllowed();
        break;
    }
};

const handleTypesRequest = (req, res, sequelize, responseHandler) => {
    const subscriptionTypes = new SubscriptionTypes({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptionTypes.sendGetAll();
    case "POST":
        if(req.body.update){
            return subscriptionTypes.sendUpdate();
        }

        return subscriptionTypes.sendCreate();
    default:
        responseHandler.sendMethodNotAllowed();
        break;
    }
};

const handleSubscribersRequest = (req, res, sequelize, responseHandler) => {
    const subscribers = new Subscribers({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscribers.sendGetAll();
    default:
        responseHandler.sendMethodNotAllowed();
        break;
    }
};

const parseUrl = (url) => {
    if(!url.includes(urls.subscriptions)){
        return url.replace(/\//g, '');
    }

    return url.split(urls.subscriptions)[1].replace(/\//g, '');
};

module.exports = (server, sequelize) => {
    server.use(`${urls.subscriptions}`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);

        switch(parseUrl(req.url)){
        case parseUrl(urls.subscriptions):
            return handleSubscriptionsRequest(req, res, sequelize, responseHandler);
        case parseUrl(urls.subscriptionContracts):
            return handleContractsRequest(req, res, sequelize, responseHandler);
        case parseUrl(urls.subscriptionTypes):
            return handleTypesRequest(req, res, sequelize, responseHandler);
        case parseUrl(urls.subscriptionSubscribers):
            return handleSubscribersRequest(req, res, sequelize, responseHandler);
        default:
            responseHandler.sendNotFound();
            break;
        }
    });
};