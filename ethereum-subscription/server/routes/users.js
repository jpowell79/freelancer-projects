const axios = require('axios');
const urls = require('../../services/urls');
const validation = require('../../services/validation');
const roles = require('../../services/roles');
const serverSettings = require('../serverSettings');
const isTest = require('../tests/serverTestSettings').isTest;

const validateGrecaptcha = (req) => {
    const secret = `secret=${serverSettings.RECAPTCHA_SECRET_KEY}`;
    const response = `response=${req.body.grecaptcha}`;
    const remoteip = `remoteip=${req.ip}`;
    const options = `?${secret}&${response}&${remoteip}`;

    return (
        axios.post(`https://www.google.com/recaptcha/api/siteverify${options}`)
            .then(response => response.data)
    );
};

const registerUser = (req, res, sequelize, {
    username,
    email,
    role,
    password,
    walletAddress
}) => {
    if(!username || !email || !role || !password || !walletAddress){
        res.status(400).send('Missing required fields.');
        return;
    }

    const passwordErrors = validation.getPasswordError(password);

    if(passwordErrors !== ''){
        res.status(400).send(passwordErrors);
        return;
    }

    if(role === roles.admin){
        res.status(400).send('You cannot create admin accounts through this api.');
        return;
    }

    return validateGrecaptcha(req)
        .then(recaptchaValidation => {
            if(!recaptchaValidation.success && !isTest(sequelize))
                throw new Error('Grecaptcha not verified.');

            return sequelize.models.users.findOne({where: {username}});
        })
        .then(user => {
            if (user !== null) throw new Error("User already exists.");

            //TODO: Send confirm email.

            return sequelize.models.users.create({
                username,
                email,
                role,
                password,
                walletAddress
            });
        })
        .then(user => {
            req.session.user = {
                username: user.dataValues.username,
                email: user.dataValues.username,
                role: user.dataValues.role,
                walletAddress: user.dataValues.walletAddress
            };

            res.send(req.session.user);
        })
        .catch(err => {
            res.status(400).send(err.toString());
        });
};

const handlePost = (req, res, sequelize) => {
    if(!req.body){
        res.sendStatus(400);
        return;
    }

    if(req.body.isActivated){
        //TODO: Activate User
    } else {
        registerUser(req, res, sequelize, req.body);
    }
};

module.exports = (server, sequelize) => {
    server.use(urls.users, server.initSessionVariables, (req, res) => {
        switch (req.method){
        case "GET":
            res.sendStatus(200);
            break;
        case "POST":
            handlePost(req, res, sequelize);
            break;
        default:
            res.sendStatus(405);
            break;
        }
    });
};