"use strict";

const Request = require('./Request');
const {urls} = require('../../../../services/constants');
const Subscriptions = require('../Subscriptions');
const Subscribers = require('../Subscribers');
const SubscriptionContracts = require('../SubscriptionContracts');
const SubscriptionTypes = require('../SubscriptionTypes');

class SubscriptionsRequest extends Request {
    constructor(params){
        super(params);

        this.params = params;
        this.handle = this.handle.bind(this);
    }

    static parseUrl(url){
        if(!url.includes(urls.subscriptions)){
            return url.replace(/\//g, '');
        }

        return url.split(urls.subscriptions)[1].replace(/\//g, '');
    };

    async handle(){
        const {parseUrl} = SubscriptionsRequest;

        switch(parseUrl(this.req.url)){
        case parseUrl(urls.subscriptions):
            return this.handleRequest();
        case parseUrl(urls.subscriptionContracts):
            return this.handleContractsRequest();
        case parseUrl(urls.subscriptionTypes):
            return this.handleTypesRequest();
        case parseUrl(urls.subscriptionSubscribers):
            return this.handleSubscribersRequest();
        default:
            return this.responseHandler.sendNotFound();
        }
    }

    async handleRequest(){
        const subscriptions = new Subscriptions(this.params);
        const subscribers = new Subscribers(this.params);

        switch (this.req.method){
        case "GET":
            return subscriptions.sendGetAll();
        case "POST":
            return subscribers.createIfNotExists()
                .then(() => subscriptions.sendCreate());
        default:
            this.responseHandler.sendMethodNotAllowed();
            break;
        }
    };

    async handleContractsRequest(){
        const subscriptionContracts = new SubscriptionContracts(this.params);

        switch (this.req.method){
        case "GET":
            return subscriptionContracts.sendGetAll();
        case "POST":
            if(this.req.body.update){
                return subscriptionContracts.sendUpdate();
            }

            return subscriptionContracts.sendCreate();
        default:
            this.responseHandler.sendMethodNotAllowed();
            break;
        }
    };

    async handleTypesRequest(){
        const subscriptionTypes = new SubscriptionTypes(this.params);

        switch (this.req.method){
        case "GET":
            return subscriptionTypes.sendGetAll();
        case "POST":
            if(this.req.body.update){
                return subscriptionTypes.sendUpdate();
            }

            return subscriptionTypes.sendCreate();
        default:
            this.responseHandler.sendMethodNotAllowed();
            break;
        }
    };

    async handleSubscribersRequest(){
        const subscribers = new Subscribers(this.params);

        switch (this.req.method){
        case "GET":
            return subscribers.sendGetAll();
        default:
            this.responseHandler.sendMethodNotAllowed();
            break;
        }
    };
}

module.exports = SubscriptionsRequest;