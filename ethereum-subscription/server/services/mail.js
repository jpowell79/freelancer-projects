const nodemailer = require('nodemailer');
const url = require('url');

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