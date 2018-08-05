const {urls, httpCodes} = require('../../services/constants/');
const SubscriptionTypes = require('../services/api/SubscriptionTypes');
const SubscriptionContracts = require('../services/api/SubscriptionContracts');
const Subscriptions = require('../services/api/Subscriptions');
const Subscribers = require('../services/api/Subscribers');
const {
    METHOD_NOT_ALLOWED,
    NOT_FOUND
} = httpCodes;

const handleSubscriptionsRequest = (req, res, sequelize) => {
    const subscriptions = new Subscriptions({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptions.sendGetAll();
    default:
        res.sendStatus(METHOD_NOT_ALLOWED);
        break;
    }
};

const handleContractsRequest = (req, res, sequelize) => {
    const subscriptionContracts = new SubscriptionContracts({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptionContracts.sendGetAll();
    default:
        res.sendStatus(METHOD_NOT_ALLOWED);
        break;
    }
};

const handleTypesRequest = (req, res, sequelize) => {
    const subscriptionTypes = new SubscriptionTypes({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscriptionTypes.sendGetAll();
    case "POST":
        return subscriptionTypes.sendCreate();
    default:
        res.sendStatus(METHOD_NOT_ALLOWED);
        break;
    }
};

const handleSubscribersRequest = (req, res, sequelize) => {
    const subscribers = new Subscribers({req, res, sequelize});

    switch (req.method){
    case "GET":
        return subscribers.sendGetAll();
    default:
        res.sendStatus(METHOD_NOT_ALLOWED);
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
        switch(parseUrl(req.url)){
        case parseUrl(urls.subscriptions):
            return handleSubscriptionsRequest(req, res, sequelize);
        case parseUrl(urls.subscriptionContracts):
            return handleContractsRequest(req, res, sequelize);
        case parseUrl(urls.subscriptionTypes):
            return handleTypesRequest(req, res, sequelize);
        case parseUrl(urls.subscriptionSubscribers):
            return handleSubscribersRequest(req, res, sequelize);
        default:
            res.sendStatus(NOT_FOUND);
            break;
        }
    });
};