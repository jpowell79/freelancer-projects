const Request = require("../Request");
const Subscriptions = require("../../services/api/Subscriptions");
const Subscribers = require("../../services/api/Subscribers");

class SubscriptionsRequest extends Request {
    constructor(params){
        super(params);

        this.subscriptions = new Subscriptions({
            ...params,
            responseHandler: this.responseHandler
        });
        this.subscribers = new Subscribers({
            ...params,
            responseHandler: this.responseHandler
        });
    }

    async handleGet(){
        return this.subscriptions.sendGetAll();
    }

    async handleDelete(){
        return this.subscriptions.sendDelete();
    }

    async handlePost(){
        return this.subscribers.createIfNotExists()
            .then(() => this.subscriptions.sendCreate());
    }
}

module.exports = SubscriptionsRequest;