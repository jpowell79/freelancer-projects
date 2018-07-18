const axios = require('axios');
const urls = require('../services/utils/urls');
const Settings = require('../../site-settings');
const nodemailer = require('nodemailer');

const validateGrecaptcha = (req) => {
    const secret = `secret=${Settings.RECAPTCHA_SECRET_KEY}`;
    const response = `response=${req.body.grecaptcha}`;
    const remoteip = `remoteip=${req.ip}`;
    const options = `?${secret}&${response}&${remoteip}`;

    return (
        axios.post(`https://www.google.com/recaptcha/api/siteverify${options}`)
            .then(response => {
                return response.data;
            })
    );
};

const validateFields = (req) => {
    return new Promise(resolve => {
        req.Validator
            .validate('name', {
                length: {
                    min: 1,
                    max: Settings.MAX_NAME_LENGTH
                }
            }).validate('email', {
                length: {
                    min: 1,
                    max: Settings.MAX_EMAIL_LENGTH
                },
                email: true
            }).validate('website', {
                length: {
                    min: 0,
                    max: Settings.MAX_WEBSITE_LENGTH
                }
            }).validate('walletAddress', {
                length: {
                    min: 0,
                    max: 42
                }
            }).validate('message', {
                length: {
                    min: 0,
                    max: Settings.MAX_MESSAGE_LENGTH
                }
            }).getErrors(errors => {
                if(errors.length > 0){
                    resolve({
                        errors: errors
                    });
                } else {
                    resolve({
                        name: req.Validator.getValue('name'),
                        email: req.Validator.getValue('email'),
                        website: req.Validator.getValue('website'),
                        message: req.Validator.getValue('message'),
                        walletAddress: req.Validator.getValue('walletAddress')
                    });
                }
            });
    });
};

const sendEmail = (validatedFields) => {
    const {
        RECEIVER,
        TRANSPORTER,
        IS_ETHEREAL_ACCOUNT
    } = Settings.EMAIL_SETTINGS;

    const transporter = nodemailer.createTransport(TRANSPORTER);
    const wallet = (validatedFields.walletAddress.startsWith('0x') &&
        validatedFields.walletAddress.length === 42) ? (
            `<p><strong>Ethereum Wallet:</strong> ` +
            `${validatedFields.walletAddress}</p>`
    ) : '';
    const website = (validatedFields.website === '') ? ''
        : (
            `<p><strong>Website:</strong> ` +
            `<a href="${validatedFields.website}">${validatedFields.website}</a></p>`
        );
    const message = (validatedFields.message === '') ? ''
        : (
            `<p><strong>Message:</strong></p>` +
            `<p>${validatedFields.message}</p>`
        );

    const sendMessage = {
        from: validatedFields.email,
        to: RECEIVER,
        subject: `CryptoTrade message from ${validatedFields.name}`,
        html: wallet + website + message
    };

    return new Promise(resolve => {
        transporter.sendMail(sendMessage, (error, info) => {
            if(IS_ETHEREAL_ACCOUNT) {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }

            resolve({
                emailSendData: {
                    error: error,
                    info: info
                }
            });
        });
    });
};

module.exports = (server) => {
    server.use(urls.email, (req, res) => {
        if(!req.body.grecaptcha){
            res.status(403).send();
        } else {
            let fields = {};
            let grecaptchaValidation = {};

            validateGrecaptcha(req)
                .then(recaptchaValidation => {
                    grecaptchaValidation = recaptchaValidation;
                    return validateFields(req);
                }).then(validatedFields => {
                    fields = validatedFields;

                    if(fields.errors !== undefined){
                        return {
                            error: 'Invalid fields detected.'
                        }
                    }

                    if(!grecaptchaValidation.success){
                        return {
                            error: 'Grecaptcha not verified.'
                        }
                    }

                    return sendEmail(validatedFields);
                }).then(emailSendData => {
                    res.send({
                        fields,
                        emailSendData,
                        grecaptchaValidation
                    });
                }).catch(() => {
                    res.send({
                        grecaptchaValidation: {
                            success: false
                        }
                    });
                });
        }
    });
};