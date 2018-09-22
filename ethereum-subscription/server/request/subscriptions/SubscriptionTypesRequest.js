const Request = require("../Request");
const SubscriptionTypes = require("../../services/api/SubscriptionTypes");

class SubscriptionTypesRequest extends Request {
    constructor(params){
        super(params);

        this.subscriptionTypes = new SubscriptionTypes({
            ...params,
            responseHandler: this.responseHandler
        });
    }

    async handleGet(){
        return this.subscriptionTypes.sendGetAll();
    }

    async handleUpdate(){
        return this.subscriptionTypes.sendUpdate();
    }

    async handlePost(){
        return this.subscriptionTypes.sendCreate();
    }
}

module.exports = SubscriptionTypesRequest;