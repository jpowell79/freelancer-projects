const Request = require("./Request");
const {mailTypes} = require("../../services/constants");
const Emailer = require("../services/email/Emailer");

const adminMailTypes = [
    mailTypes.massMailSuppliers
];

const subscriberMailTypes = [
    mailTypes.requestSubscription
];

class EmailRequest extends Request {
    constructor(params){
        super(params);

        this.emailer = new Emailer(params.req);
    }

    async handlePost(){
        return this.sendMail();
    }

    async sendMail(){
        const mailType = this.req.params.type;

        if(!mailTypes.includes(mailType)){
            return this.responseHandler
                .sendBadRequest(`Invalid email type: ${this.req.params.type}`);
        } else if(adminMailTypes.includes(mailType)){
            if(!this.isLoggedInAdmin())
                return this.responseHandler.sendUnauthorized();
        } else if(!subscriberMailTypes.includes(mailType)){
            if(!this.isLoggedIn())
                return this.responseHandler.sendUnauthorized();
        }

        switch(mailType){
        case mailTypes.confirmationMail:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendConfirmEmail());
        case mailTypes.contractCreated:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendContractCreatedMail());
        case mailTypes.requestContract:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendContractRequestMail());
        case mailTypes.requestSubscription:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendRequestSubscriptionMails());
        case mailTypes.massMailSuppliers:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendMassSupplierMail(this.sequelize));
        case mailTypes.subscriptionStarted:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendSubscriptionStartedMail());
        case mailTypes.trialStarted:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendTrialStartedMail());
        default:
            this.responseHandler.sendBadRequest(`Invalid email type: ${this.req.params.type}`);
            break;
        }
    }
}

module.exports = EmailRequest;