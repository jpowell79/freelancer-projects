const Request = require("./Request");
const {mailTypes, paths} = require("../../services/constants");
const Emailer = require("../services/email/Emailer");
const cookieSession = require("../services/cookieSession");
const uuidv4 = require("uuid/v4");
const {Op} = require("sequelize");

const adminMailTypes = [
    mailTypes.massMailSuppliers
];

const subscriberMailTypes = [
    mailTypes.requestSubscription,
    mailTypes.subscriptionCancelled,
    mailTypes.restorePassword
];

class EmailRequest extends Request {
    constructor(params){
        super(params);

        this.emailer = new Emailer(params.req);
    }

    async handleGet(){
        if(this.isEmailConfirmation()){
            this.req.session.restorePassword = true;
            return this.responseHandler.redirect(paths.pages.login);
        }

        return this.responseHandler.sendBadRequest();
    }

    async handlePost(){
        return this.sendMail();
    }

    async getUser(){
        const {username, email} = this.req.body;

        return this.sequelize.models.users
            .findOne({
                where: {
                    [Op.or]: {username, email}
                }
            })
            .then(userRes => {
                if(!userRes)
                    throw new Error("The user does not exist");

                return userRes.dataValues;
            });
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
        case mailTypes.subscriptionCancelled:
            return this.responseHandler
                .handlePromiseResponse(this.emailer.sendSubscriptionCancelledMails());
        case mailTypes.restorePassword:
            return this.responseHandler
                .handlePromiseResponse(this.getUser()
                    .then(user => {
                        const uuid = uuidv4();
                        cookieSession.saveTempUser(this.req, user, uuid);
                        return this.emailer.sendRestorePasswordMail(user, uuid);
                    })
                );
        default:
            this.responseHandler.sendBadRequest(`Invalid email type: ${this.req.params.type}`);
            break;
        }
    }

    isEmailConfirmation(){
        if(!this.req.params.uuid) return false;

        return this.req.params.uuid === this.req.session.tempUser.uuid;
    }
}

module.exports = EmailRequest;