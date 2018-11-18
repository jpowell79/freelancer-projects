const nodemailer = require("nodemailer");
const url = require("url");
const {roles, paths} = require("../../../services/constants/index");
const escapeHtml = require("html-escape");
const serverSettings = require("../../serverSettings");
const {emailContentStart, emailContentEnd} = require('./emailStyles');
const etherscan = require("../../../services/api/etherscan");

class Emailer {
    constructor(req){
        this.req = req;
        this.smtpTransport = nodemailer.createTransport(serverSettings.NODEMAILER_TRANSPORT);
    }

    async sendMail(mailOptions){
        return this.smtpTransport.sendMail(mailOptions);
    };

    sendSubscriberNotificationMail(){
        const {
            supplierEmail,
            subscriberEmail,
            subscriptionName,
            etherScanUrl,
            transactionHash
        } = this.req.body;

        return this.sendMail({
            to: subscriberEmail,
            from: supplierEmail,
            subject: `[Ethereum Subscription] You have purchased ${subscriptionName}`,
            html: (
                `${emailContentStart}
                    <p>The supplier has been notified of your payment.</p>
                    <p>
                        You can expect an email with details of how to start the subscription 
                        within 24 hours.
                    </p>
                    <p>
                        <strong>Transaction Hash:</strong> <a href="${
                            etherscan.getTransactionUrl(etherScanUrl, transactionHash)
                        }">${transactionHash}</a>
                    </p>
                 ${emailContentEnd}`
            )
        });
    }

    async sendRequestSubscriptionMails(){
        const {
            supplierEmail,
            subscriberEmail,
            subscriptionName,
            transactionHash,
            etherScanUrl
        } = this.req.body;

        if(!supplierEmail || !subscriberEmail || !subscriptionName || !transactionHash){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        return this.sendMail({
            to: supplierEmail,
            from: subscriberEmail,
            subject: `[Ethereum Subscription] ${subscriberEmail} has just purchased ${subscriptionName}!`,
            html: (
                `${emailContentStart}
                <p>
                    Please re-visit the contract in your control panel to add any necessary 
                    username/password details and activate the subscription. Failure to 
                    activate the subsription within 24 hours will result in an automatic 
                    refund of all Eth to the subscriber.
                </p>
                <p>
                    <strong>Transaction Hash:</strong> <a href="${
                        etherscan.getTransactionUrl(etherScanUrl, transactionHash)
                    }">${transactionHash}</a>
                </p>
                ${emailContentEnd}`
            )
        }).then(() => this.sendSubscriberNotificationMail());
    }

    async sendContractRequestMail(){
        const {
            contactDetails,
            exitFee,
            joinFee,
            hasFreeTrials,
            subscriptionDetails,
            subscriptionLengthInWeeks,
            subscriptionName,
            subscriptionPrice,
            subscriptionType
        } = this.req.body;

        if(!exitFee || !joinFee || !subscriptionLengthInWeeks || !subscriptionName ||
            !subscriptionPrice || !subscriptionType
        ){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        return this.sendMail({
            to: "sampletonexample@gmail.com",
            from: this.req.session.user.email,
            subject: `[Ethereum Subscription] Contract request from ${this.req.session.user.username}`,
            html: (
                `${emailContentStart}
                    <p><strong>Contact Details:</strong></p>
                    <p>${escapeHtml(contactDetails ? contactDetails : "")}</p>
                    <hr>
                    <p><strong>Subscription Name:</strong></p>
                    <p>${escapeHtml(subscriptionName)}</p>
                    <hr>
                    <p><strong>Subscription Type:</strong></p>
                    <p>${escapeHtml(subscriptionType)}</p>
                    <hr>
                    <p><strong>Subscription Length (in weeks):</strong></p>
                    <p>${escapeHtml(subscriptionLengthInWeeks)}</p>
                    <hr>
                    <p><strong>Subscription Price (in Wei):</strong></p>
                    <p>${escapeHtml(subscriptionPrice)}</p>
                    <hr>
                    <p><strong>Joining Fee (in Wei):</strong></p>
                    <p>${escapeHtml(joinFee)}</p>
                    <hr>
                    <p><strong>Exit Fee (in Wei):</strong></p>
                    <p>${escapeHtml(exitFee)}</p>
                    <hr>
                    <p><strong>Free Trials:</strong></p>
                    <p>${(hasFreeTrials) ? "Yes" : "No"}</p>
                    <hr>
                    <p><strong>Subscription Details:</strong></p>
                    <p>${escapeHtml(subscriptionDetails ? subscriptionDetails : "")}</p>
                ${emailContentEnd}`
            )
        });
    }

    async sendMassSupplierMail(sequelize){
        const {
            subject,
            body
        } = this.req.body;

        if(!subject || !body){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        return sequelize.models.users
            .findAll({where: {role: roles.supplier}})
            .then(entries => entries.map(entry => entry.dataValues))
            .then(users => {
                return Promise.all(users.map(user => {
                    return this.sendMail({
                        to: user.email,
                        subject,
                        html: (
                            `${emailContentStart}
                                <p>Hi <strong>${user.username}!</strong></p>
                                <p>${escapeHtml(body)}</p>
                            ${emailContentEnd}`
                        )
                    });
                }));
            });
    };

    async sendContractCreatedMail(){
        const {
            subscriptionName,
            email
        } = this.req.body;

        if(!subscriptionName || !email){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        const fullUrl = this.getFullUrl(paths.pages.supplier);

        return this.sendMail({
            to: email,
            subject: `[Ethereum Subscription] Your ${subscriptionName} contract is ready!`,
            html: (
                `${emailContentStart}
                    <p>Hi <strong>${email}!</strong></p>
                    <p>Please visit your control panel to add or amend information to the ` +
                    `subscription.` +
                    `<p>You can click on <a href="${fullUrl}">this link</a> to take you ` +
                    `directly to the smart contract</p>
                ${emailContentEnd}`
            )
        });
    }

    async sendConfirmEmail(){
        const user = this.req.session.tempUser;
        const fullUrl = this.getFullUrl(this.req.originalUrl);
        const verifyLink = `${fullUrl}/${user.uuid}`;

        return this.sendMail({
            to: user.email,
            subject: "[Ethereum Subscription] Please verify your email address.",
            html: (
                `${emailContentStart}
                    <p>Hi <strong>${this.req.session.tempUser.username}!</strong></p>
                    <p>To activate your Ethereum Subscription account please press the link below.</p>
                    <a href="${verifyLink}">Verify email address</a>
                    <p>The above link will expire 1 hour after this message was sent.</p>
                    <hr>
                    <p class="fine-print">
                        You’re receiving this email because you recently created a new Ethereum ` +
                        `Subscription account. If this wasn’t you, please ignore this email.
                    </p>
                ${emailContentEnd}`
            )
        });
    }

    async sendTrialStartedMail(){
        return this.sendSubscriptionStartedMail(true);
    }

    async sendSubscriptionStartedMail(trial = false){
        const {
            supplierEmail,
            subscriberEmail,
            subscriptionName,
            contractAddress
        } = this.req.body;

        if(!supplierEmail || !contractAddress || !subscriptionName || !subscriberEmail){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        const fullUrl = this.getFullUrl(paths.pages.subscriptionInfo);

        const subject = (trial)
            ? `[Ethereum Subscription] Your trial to ${subscriptionName} has just started!`
            : `[Ethereum Subscription] Your subscription to ${subscriptionName} has just started!`;

        const html = (trial)
            ? (
                `${emailContentStart}
                    <p>You can now re-visit <a href="${fullUrl}?address=${contractAddress
                    }">the contract</a> to see more details about the trial.</p>
                ${emailContentEnd}`
            )
            : (
                `${emailContentStart}
                    <p>You can now re-visit <a href="${fullUrl}?address=${contractAddress
                    }">the contract</a> to see more details about the subscription.</p>
                ${emailContentEnd}`
            );

        return this.sendMail({
            to: subscriberEmail,
            from: supplierEmail,
            subject,
            html
        });
    }

    async sendSubscriptionCancelledMails(){
        const {
            subscriptionName,
            supplierEmail,
            subscriberEmail,
            cancelRole
        } = this.req.body;

        if(!subscriptionName || !supplierEmail || !subscriberEmail){
            return new Promise(() => {
                throw new Error("Missing required fields.");
            });
        }

        const sendSubscriptionCancelledMail = ({from, to}) => {
            return this.sendMail({
                to,
                from,
                subject: (
                    `[Ethereum Subscription] The subscription to ${subscriptionName} has been ` +
                    `cancelled by the ${cancelRole}`
                ),
                html: (
                    `${emailContentStart}
                        <p>The subscription to ${subscriptionName} has been cancelled by the ${cancelRole}.</p>
                    ${emailContentEnd}`
                )
            });
        };

        return sendSubscriptionCancelledMail({
            from: supplierEmail,
            to: subscriberEmail
        }).then(() => sendSubscriptionCancelledMail({
            from: subscriberEmail,
            to: supplierEmail
        }));
    }

    async sendRestorePasswordMail({username, email}, uuid){
        const fullUrl = this.getFullUrl(this.req.originalUrl);
        const restoreLink = `${fullUrl}/${uuid}`;

        return this.sendMail({
            to: email,
            subject: `[Ethereum Subscription] Reset password for ${username}`,
            html: (
                `${emailContentStart}
                    <p>
                        A request has been made to reset your password. Please click on the ` +
                        `link below to reset your password. If you did not make this request ` +
                        `please ignore this email.
                    </p>
                    <p><a href="${restoreLink}">Restore password</a></p>
                ${emailContentEnd}`
            )
        });
    }

    getFullUrl(pathname){
        return url.format({
            protocol: this.req.protocol,
            host: this.req.get("host"),
            pathname
        });
    }
}

module.exports = Emailer;