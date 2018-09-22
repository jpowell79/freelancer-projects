const {urls, httpCodes} = require("../../services/constants/");
const SubscriptionsRequest = require("../request/subscriptions/SubscriptionsRequest");
const SubscriptionContractRequest = require("../request/subscriptions/SubscriptionContractRequest");
const SubscribersRequest = require("../request/subscriptions/SubscriptionSubscribersRequest");
const SubscriptionTypesRequest = require("../request/subscriptions/SubscriptionTypesRequest");

const parseUrl = (url) => {
    if(!url.includes(urls.subscriptions)){
        return url.replace(/\//g, "");
    }

    return url.split(urls.subscriptions)[1].replace(/\//g, "");
};

module.exports = (server, sequelize) => {
    server.use(`${urls.subscriptions}`, server.initSession, (req, res) => {
        const params = {req, res, sequelize};

        switch(parseUrl(req.url)){
        case parseUrl(urls.subscriptions):
            return new SubscriptionsRequest(params).handle();
        case parseUrl(urls.subscriptionContracts):
            return new SubscriptionContractRequest(params).handle();
        case parseUrl(urls.subscriptionTypes):
            return new SubscriptionTypesRequest(params).handle();
        case parseUrl(urls.subscriptionSubscribers):
            return new SubscribersRequest(params).handle();
        default:
            return this.res.sendStatus(httpCodes.NOT_FOUND);
        }
    });
};