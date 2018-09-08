const nodemailer = require('nodemailer');
const url = require('url');
const {roles, paths} = require('../../../services/constants/index');
const escapeHtml = require('html-escape');
const serverSettings = require('../../serverSettings');

const emailStyle = `
    <style type="text/css">
        .body {
            background-color: #eeeeee;
            padding: 40px 0;
            font-size: 18px;
        }
        .wrapper {
            max-width: 650px;
            margin: 0 auto;
        }
        .segment {
            box-shadow: rgba(34, 36, 38, 0.15) 0 1px 2px 0;
            background: rgb(255, 255, 255);
            margin: 1rem 0;
            padding: 1em;
            border-radius: 0.285714rem;
            border: 1px solid rgba(34, 36, 38, 0.15);
        }
        .fine-print {
            font-size: 14px;
        }
        hr {
            border-top: 1px solid rgba(34,36,38,.15);
            border-bottom: 1px solid rgba(255,255,255,.1);
        }
    </style>
`;

const emailContentStart = `
    <div>
        ${emailStyle}
        <div class="body">
            <div class="wrapper">
                <div class="segment">
`;
const emailContentEnd = `
                </div>
            </div>
        </div>
    </div>
`;

class Mailer {
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
            subscriptionName
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
                 ${emailContentEnd}`
            )
        });
    }

    async sendRequestSubscriptionMails(){
        const {
            supplierEmail,
            subscriberEmail,
            subscriptionName
        } = this.req.body;

        if(!supplierEmail || !subscriberEmail || !subscriptionName){
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
                    <p>${escapeHtml(contactDetails ? contactDetails : '')}</p>
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
                    <p>${escapeHtml(subscriptionDetails ? subscriptionDetails : '')}</p>
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

        const fullUrl = url.format({
            protocol: this.req.protocol,
            host: this.req.get('host'),
            pathname: paths.pages.supplier
        });

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
        const fullUrl = url.format({
            protocol: this.req.protocol,
            host: this.req.get('host'),
            pathname: this.req.originalUrl
        });
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

    isValidEmailConfirmation(uuid){
        return uuid === this.req.session.tempUser.uuid;
    }
}

module.exports = Mailer;