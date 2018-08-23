const {urls} = require('../../services/constants/');
const SubscriptionTypes = require('../services/api/SubscriptionTypes');
const SubscriptionContracts = require('../services/api/SubscriptionContracts');
const Subscriptions = require('../services/api/Subscriptions');
const Subscribers = require('../services/api/Subscribers');
const ResponseHandler = require('../services/api/ResponseHandler');

function SubscriptionsRequest({req, res, sequelize, responseHandler}){
    this.handleRequest = () => {
        const subscriptions = new Subscriptions({req, sequelize, responseHandler});
        const subscribers = new Subscribers({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return subscriptions.sendGetAll();
        case "POST":
            return subscribers.createIfNotExists()
                .then(() => subscriptions.sendCreate());
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    };

    this.handleContractsRequest = () => {
        const subscriptionContracts = new SubscriptionContracts({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return subscriptionContracts.sendGetAll();
        case "POST":
            if(req.body.update){
                return subscriptionContracts.sendUpdate();
            }

            return subscriptionContracts.sendCreate();
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    };

    this.handleTypesRequest = () => {
        const subscriptionTypes = new SubscriptionTypes({req, sequelize, responseHandler});

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

    this.handleSubscribersRequest = () => {
        const subscribers = new Subscribers({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return subscribers.sendGetAll();
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    };
}

const parseUrl = (url) => {
    if(!url.includes(urls.subscriptions)){
        return url.replace(/\//g, '');
    }

    return url.split(urls.subscriptions)[1].replace(/\//g, '');
};

module.exports = (server, sequelize) => {
    server.use(`${urls.subscriptions}`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const subscriptionsRequest = new SubscriptionsRequest({
            req, res, sequelize, responseHandler
        });

        switch(parseUrl(req.url)){
        case parseUrl(urls.subscriptions):
            return subscriptionsRequest.handleRequest();
        case parseUrl(urls.subscriptionContracts):
            return subscriptionsRequest.handleContractsRequest();
        case parseUrl(urls.subscriptionTypes):
            return subscriptionsRequest.handleTypesRequest();
        case parseUrl(urls.subscriptionSubscribers):
            return subscriptionsRequest.handleSubscribersRequest();
        default:
            responseHandler.sendNotFound();
            break;
        }
    });
};