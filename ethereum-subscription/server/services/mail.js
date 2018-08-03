const nodemailer = require('nodemailer');
const url = require('url');
const {roles} = require('../../services/constants');

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sampletonexample",
        pass: "Sampleton_Example"
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports.sendMail = (mailOptions) => {
    return smtpTransport.sendMail(mailOptions);
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
            console.log(users);

            return Promise.all(users.map(user => {
                const mailOptions = {
                    to: user.email,
                    subject,
                    html: (
                        `<div>
                             <p>Hi <strong>${user.username}!</strong></p>
                             <p>${body}</p>
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
        contactDetails
    } = req.body;

    if(!subscriptionName || !contactDetails){
        return new Promise(() => {
            throw new Error("Missing required fields.");
        });
    }

    const mailOptions = {
        to: contactDetails,
        subject: "[Ethereum Subscription] Your contract request has been approved!",
        html: (
            `<div>
                <p>Hi <strong>${contactDetails}!</strong></p>
                <p>Your <strong>${subscriptionName}</strong> contract has now been published ` +
                  `and is accessible on the website.</p>
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