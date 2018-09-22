const Request = require("../Request");
const SubscriptionContracts = require("../../services/api/SubscriptionContracts");

class SubscriptionContractRequest extends Request {
    constructor(params){
        super(params);

        this.subscriptionTypes = new SubscriptionContracts({
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

module.exports = SubscriptionContractRequest;