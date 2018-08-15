const nodemailer = require('nodemailer');
const url = require('url');
const {roles, paths} = require('../../../services/constants/index');
const escapeHtml = require('html-escape');
const serverSettings = require('../../serverSettings');

const smtpTransport = nodemailer.createTransport(serverSettings.NODEMAILER_TRANSPORT);

module.exports.sendMail = (mailOptions) => (
    smtpTransport.sendMail(mailOptions)
);

module.exports.sendContractRequestMail = (req) => {
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
    } = req.body;

    if(!exitFee || !joinFee || !subscriptionLengthInWeeks || !subscriptionName ||
        !subscriptionPrice || !subscriptionType
    ){
        return new Promise(() => {
            throw new Error("Missing required fields.");
        });
    }

    const mailOptions = {
        to: "sampletonexample@gmail.com",
        from: req.session.user.email,
        subject: `Contract request from ${req.session.user.username}`,
        html: (
            `<div>
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
             </div>`
        )
    };

    return module.exports.sendMail(mailOptions);
};

module.exports.sendMassSupplierMail = (req, sequelize) => {
    const {
        subject,
        body
    } = req.body;

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
                const mailOptions = {
                    to: user.email,
                    subject,
                    html: (
                        `<div>
                             <p>Hi <strong>${user.username}!</strong></p>
                             <p>${escapeHtml(body)}</p>
                        </div>`
                    )
                };

                return module.exports.sendMail(mailOptions);
            }));
        });
};

module.exports.sendContractCreatedMail = (req) => {
    const {
        subscriptionName,
        email
    } = req.body;

    if(!subscriptionName || !email){
        return new Promise(() => {
            throw new Error("Missing required fields.");
        });
    }

    const fullUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: paths.pages.supplier
    });

    const mailOptions = {
        to: email,
        subject: `[Ethereum Subscription] Your ${subscriptionName} contract is ready!`,
        html: (
            `<div>
                <p>Hi <strong>${email}!</strong></p>
                <p>Please visit your control panel to add or amend information to the ` +
                    `subscription.` +
                `<p>You can click on <a href="${fullUrl}">this link</a> to take you ` +
                    `directly to the smart contract</p>
             </div>`
        )
    };

    return module.exports.sendMail(mailOptions);
};

module.exports.sendConfirmEmail = (req) => {
    const user = req.session.tempUser;
    const fullUrl = url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
    const verifyLink = `${fullUrl}/${user.uuid}`;

    const mailOptions = {
        to: user.email,
        subject: "[Ethereum Subscription] Please verify your email address.",
        html: (
            `<div>
                <p>Hi <strong>${req.session.tempUser.username}!</strong></p>
                <p>To activate your Ethereum Subscription account please press the link below.</p>
                <a href="${verifyLink}">Verify email address</a>
                <p>The above link will expire 1 hour after this message was sent.</p>
                <hr>
                <p>You’re receiving this email because you recently created a new Ethereum ` +
                  `Subscription account. If this wasn’t you, please ignore this email.</p>
             </div>`
        )
    };

    return module.exports.sendMail(mailOptions);
};

module.exports.isValidEmailConfirmation = (req, uuid) => {
    return uuid === req.session.tempUser.uuid;
};