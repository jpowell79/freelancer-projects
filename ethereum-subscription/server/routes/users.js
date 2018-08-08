const axios = require('axios');
const validation = require('../../services/validation');
const {roles, urls, httpCodes} = require('../../services/constants/');
const serverSettings = require('../serverSettings');
const {saveUser, saveTempUser, isLoggedInAdmin, isLoggedIn} = require('../../services/session');
const {sendConfirmEmail, isValidEmailConfirmation} = require('../services/api/mail');
const uuidv4 = require('uuid/v4');
const paths = require('../../services/constants/paths');
const {
    SUCCESS,
    UNAUTHORIZED,
    BAD_REQUEST,
    REDIRECT,
    SOMETHING_WENT_WRONG,
    METHOD_NOT_ALLOWED,
    NOT_FOUND
} = httpCodes;

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
        res.redirect(REDIRECT, paths.pages.login);
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
        res.status(BAD_REQUEST).send('Missing required fields.');
        return;
    }

    const usernameErrors = validation.getUsernameError(username);
    const passwordErrors = validation.getPasswordError(password);
    const emailErrors = validation.getEmailError(email);
    const walletAddressErrors = validation.getEthereumAddressError(walletAddress);

    if(usernameErrors !== ''){
        res.status(BAD_REQUEST).send(usernameErrors);
        return false;
    }

    if(passwordErrors !== ''){
        res.status(BAD_REQUEST).send(passwordErrors);
        return false;
    }

    if(emailErrors !== ''){
        res.status(BAD_REQUEST).send(emailErrors);
        return false;
    }

    if(walletAddressErrors !== ''){
        res.status(BAD_REQUEST).send(walletAddressErrors);
        return false;
    }

    if(role === roles.admin){
        res.status(BAD_REQUEST).send('You cannot create admin accounts through this api.');
        return false;
    }

    if(!roles[role]){
        res.status(BAD_REQUEST).send('Role does not exist');
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
            res.sendStatus(BAD_REQUEST);
        })
        .catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.send(err.toString());
        });
};

const filterUsers = (userEntries) => {
    return userEntries
        .map(entry => entry.dataValues)
        .map(user => ({
            username: user.username,
            role: user.role,
            rating: user.rating
        }));
};

const filterUsersAsAdmin = (userEntries) => {
    return userEntries
        .map(entry => entry.dataValues)
        .map(user => ({
            username: user.username,
            walletAddress: user.walletAddress,
            email: user.email,
            role: user.role,
            rating: user.rating
        }));
};

const updateUser = async (req, res, sequelize, {username, originalUsername, email}) => {
    const loggedIn = await isLoggedIn(req);

    if(!loggedIn){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    if(req.session.user.username !== originalUsername){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    return sequelize.models.users
        .update({username, email}, {where: {username: originalUsername}})
        .then(() => sequelize.models.users.findOne({where: {username}}))
        .then(userRes => {
            saveUser(req, userRes.dataValues);
            res.send(userRes.dataValues);
        })
        .catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.status(BAD_REQUEST).send(err.toString());
        });
};

const handlePost = (req, res, sequelize) => {
    if(!req.body){
        res.sendStatus(BAD_REQUEST);
        return;
    }

    if(req.body.update){
        updateUser(req, res, sequelize, req.body);
    } else {
        registerTempUser(req, res, sequelize, req.body);
    }
};

const handleGet = async (req, res, sequelize) => {
    if(req.params.param && isValidEmailConfirmation(req, req.params.param)) {
        createUser(req, res, sequelize);
        return;
    }

    const loggedInAdmin = await isLoggedInAdmin(req);

    if(req.params.param){
        return sequelize.models.users
            .findOne({where: {username: req.params.param}})
            .then(userEntry => {
                if(loggedInAdmin){
                    res.status(SUCCESS).send(filterUsersAsAdmin([userEntry]));
                } else {
                    res.status(SUCCESS).send(filterUsers([userEntry]));
                }
            })
            .catch(() => {
                res.sendStatus(NOT_FOUND);
            });
    }

    return sequelize.models.users
        .findAll()
        .then(userEntries => {
            if(loggedInAdmin){
                res.status(SUCCESS).send(filterUsersAsAdmin(userEntries));
            } else {
                res.status(SUCCESS).send(filterUsers(userEntries));
            }
        })
        .catch(err => {
            res.status(SOMETHING_WENT_WRONG).send(err.toString());
        });
};

const handleDelete = async (req, res, sequelize) => {
    const loggedInAdmin = await isLoggedInAdmin(req);

    if(!loggedInAdmin){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    const username = req.query.username;

    if(!username){
        res.sendStatus(BAD_REQUEST);
        return;
    }

    return sequelize.models.users
        .destroy({where: {username}})
        .then(() => {
            res.sendStatus(SUCCESS);
        })
        .catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(NOT_FOUND);
        })
};

module.exports = (server, sequelize) => {
    server.use(`${urls.users}/:param?`, server.initSession, (req, res) => {
        switch (req.method){
        case "GET":
            handleGet(req, res, sequelize);
            break;
        case "POST":
            handlePost(req, res, sequelize);
            break;
        case "DELETE":
            handleDelete(req, res, sequelize);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};