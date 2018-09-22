const Request = require("../Request");
const Subscribers = require("../../services/api/Subscribers");

class SubscriptionSubscribersRequest extends Request {
    constructor(params){
        super(params);

        this.subscribers = new Subscribers({
            ...params,
            responseHandler: this.responseHandler
        });
    }

    async handleGet(){
        return this.subscribers.sendGetAll();
    }
}

module.exports = SubscriptionSubscribersRequest;