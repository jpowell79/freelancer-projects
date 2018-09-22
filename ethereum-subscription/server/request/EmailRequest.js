const Request = require("./Request");
const {mailTypes} = require("../../services/constants");
const Mailer = require("../services/email/Mailer");

const adminMailTypes = [
    mailTypes.massMailSuppliers
];

const subscriberMailTypes = [
    mailTypes.requestSubscription
];

class EmailRequest extends Request {
    constructor(params){
        super(params);

        this.mailer = new Mailer(params.req);
        this.handlePost = this.handlePost.bind(this);
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
                .handlePromiseResponse(this.mailer.sendConfirmEmail());
        case mailTypes.contractCreated:
            return this.responseHandler
                .handlePromiseResponse(this.mailer.sendContractCreatedMail());
        case mailTypes.requestContract:
            return this.responseHandler
                .handlePromiseResponse(this.mailer.sendContractRequestMail());
        case mailTypes.requestSubscription:
            return this.responseHandler
                .handlePromiseResponse(this.mailer.sendRequestSubscriptionMails());
        case mailTypes.massMailSuppliers:
            return this.responseHandler
                .handlePromiseResponse(this.mailer.sendMassSupplierMail(this.sequelize));
        default:
            this.responseHandler.sendBadRequest(`Invalid email type: ${this.req.params.type}`);
            break;
        }
    }
}

module.exports = EmailRequest;