const axios = require('axios');
const urls = require('../../services/constants/urls');
const validation = require('../../services/validation');
const roles = require('../../services/constants/roles');
const serverSettings = require('../serverSettings');
const {saveUser, saveTempUser} = require('../../services/session');
const {sendConfirmEmail, isValidEmailConfirmation} = require('../services/mail');
const uuidv4 = require('uuid/v4');
const paths = require('../../services/constants/paths');

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

const createUser = (req, res, sequelize) => {
    saveUser(req, req.session.tempUser);
    const user = req.session.tempUser;

    return sequelize.models.users.create({
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress
    }).then(() => {
        req.session.tempUser = {};
        req.session.userWasActivated = true;
        res.redirect(301, paths.pages.login);
    }).catch(err => {
        if(global.isDevelopment()) console.error(err);
        res.send(err.toString());
    });
};

const isValidUser = (res, {
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

    const usernameErrors = validation.getUsernameError(username);
    const passwordErrors = validation.getPasswordError(password);
    const emailErrors = validation.getEmailError(email);
    const walletAddressErrors = validation.getWalletAddressError(walletAddress);

    if(usernameErrors !== ''){
        res.status(400).send(usernameErrors);
        return false;
    }

    if(passwordErrors !== ''){
        res.status(400).send(passwordErrors);
        return false;
    }

    if(emailErrors !== ''){
        res.status(400).send(emailErrors);
        return false;
    }

    if(walletAddressErrors !== ''){
        res.status(400).send(walletAddressErrors);
        return false;
    }

    if(role === roles.admin){
        res.status(400).send('You cannot create admin accounts through this api.');
        return false;
    }

    if(!roles[role]){
        res.status(400).send('Role does not exist');
        return false;
    }

    return true;
};

const registerTempUser = (req, res, sequelize, {
    username,
    email,
    role,
    password,
    walletAddress
}) => {
    if(!isValidUser(res, {username, email, role, password, walletAddress})) return;

    return validateGrecaptcha(req)
        .then(recaptchaValidation => {
            if(!recaptchaValidation.success)
                throw new Error('The reCAPTCHA could not be verified.');

            return sequelize.models.users.findOne({where: {username}});
        })
        .then(userRes => {
            if (userRes !== null || username === req.session.tempUser.username)
                throw new Error("The username already exists.");

            saveTempUser(req, {
                username,
                email,
                role,
                password,
                walletAddress
            }, uuidv4());

            return sendConfirmEmail(req);
        })
        .then(mailRes => {
            if(global.isDevelopment()) console.log(mailRes);
            res.sendStatus(200);
        })
        .catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.send(err.toString());
        });
};

const handlePost = (req, res, sequelize) => {
    if(!req.body){
        res.sendStatus(400);
        return;
    }

    registerTempUser(req, res, sequelize, req.body);
};

const handleGet = (req, res, sequelize) => {
    if(req.params.uuid && isValidEmailConfirmation(req, req.params.uuid)) {
        createUser(req, res, sequelize);
    } else {
        //TODO: Implement way of getting users (no sensitive data shared).
        res.sendStatus(200);
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.users}/:uuid?`, server.initSession, (req, res) => {
        switch (req.method){
        case "GET":
            handleGet(req, res, sequelize);
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