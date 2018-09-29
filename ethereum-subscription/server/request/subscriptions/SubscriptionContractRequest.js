const Request = require("../Request");
const SubscriptionContracts = require("../../services/api/SubscriptionContracts");

class SubscriptionContractRequest extends Request {
    constructor(params){
        super(params);

        this.subscriptionContracts = new SubscriptionContracts({
            ...params,
            responseHandler: this.responseHandler
        });
    }

    async handleGet(){
        return this.subscriptionContracts.sendGetAll();
    }

    async handleUpdate(){
        return this.subscriptionContracts.sendUpdate();
    }

    async handlePost(){
        return this.subscriptionContracts.sendCreate();
    }
}

module.exports = SubscriptionContractRequest;