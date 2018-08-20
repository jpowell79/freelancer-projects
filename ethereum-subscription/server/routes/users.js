const axios = require('axios');
const validation = require('../../services/validation');
const {roles, urls} = require('../../services/constants/');
const serverSettings = require('../serverSettings');
const {saveUser, saveTempUser, isLoggedInAdmin, isLoggedIn} = require('../../services/session');
const {sendConfirmEmail, isValidEmailConfirmation} = require('../services/api/mail');
const uuidv4 = require('uuid/v4');
const paths = require('../../services/constants/paths');
const ResponseHandler = require('../services/api/ResponseHandler');
const passwordHash = require('password-hash');

function UsersRequest({req, res, sequelize, responseHandler}){
    const validateGrecaptcha = async () => {
        const secret = `secret=${serverSettings.RECAPTCHA_SECRET_KEY}`;
        const response = `response=${req.body.grecaptcha}`;
        const remoteip = `remoteip=${req.ip}`;
        const options = `?${secret}&${response}&${remoteip}`;

        return (
            axios.post(`https://www.google.com/recaptcha/api/siteverify${options}`)
                .then(response => response.data)
        );
    };

    const isValidUser = () => {
        const {
            username,
            email,
            role,
            password,
            walletAddress
        } = req.body;

        if(!username || !email || !role || !password || !walletAddress){
            return responseHandler.sendBadRequest('Missing required fields.');
        }

        const usernameErrors = validation.getUsernameError(username);
        const passwordErrors = validation.getPasswordError(password);
        const emailErrors = validation.getEmailError(email);
        const walletAddressErrors = validation.getEthereumAddressError(walletAddress);

        if(usernameErrors !== ''){
            return responseHandler.sendBadRequest(usernameErrors);
        }

        if(passwordErrors !== ''){
            return responseHandler.sendBadRequest(passwordErrors);
        }

        if(emailErrors !== ''){
            return responseHandler.sendBadRequest(emailErrors);
        }

        if(walletAddressErrors !== ''){
            return responseHandler.sendBadRequest(walletAddressErrors);
        }

        if(role === roles.admin){
            return responseHandler.sendBadRequest('You cannot create admin accounts through this api.');
        }

        if(!roles[role]){
            return responseHandler.sendBadRequest('Role does not exist');
        }

        return true;
    };

    const createUser = () => {
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
            responseHandler.redirect(paths.pages.login);
        }).catch(err => responseHandler.sendSomethingWentWrong(err));
    };

    const registerTempUser = async () => {
        const {
            username,
            email,
            role,
            password,
            walletAddress
        } = req.body;

        if(!isValidUser()) return;

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
                responseHandler.sendSuccess();
            })
            .catch(err => responseHandler.sendSomethingWentWrong(err));
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

    const updateUser = async () => {
        const {
            username,
            originalUsername,
            email,
            password
        } = req.body;

        const loggedIn = await isLoggedIn(req);

        if(!loggedIn){
            return responseHandler.sendUnauthorized();
        }

        if(req.session.user.username !== originalUsername){
            return responseHandler.sendUnauthorized();
        }

        const hashedPassword = passwordHash.generate(password);

        return sequelize.models.users
            .update(
                {username, email, password: hashedPassword},
                {where: {username: originalUsername}}
            )
            .then(() => sequelize.models.users.findOne({where: {username}}))
            .then(userRes => {
                saveUser(req, userRes.dataValues);
                res.send(userRes.dataValues);
            })
            .catch(err => {
                responseHandler.sendBadRequest(err);
            });
    };

    this.handlePost = async () => {
        if(!req.body){
            return responseHandler.sendBadRequest();
        }

        if(req.body.update){
            return updateUser();
        } else {
            return registerTempUser();
        }
    };

    this.handleGet = async () => {
        const username = req.params.param;

        if(username && isValidEmailConfirmation(req, username)) {
            return createUser(req, res, sequelize);
        }

        const loggedInAdmin = await isLoggedInAdmin(req);

        if(req.params.param){
            return sequelize.models.users
                .findOne({where: {username}})
                .then(userEntry => {
                    if(loggedInAdmin){
                        responseHandler.sendSuccess(filterUsersAsAdmin([userEntry]));
                    } else {
                        responseHandler.sendSuccess(filterUsers([userEntry]))
                    }
                })
                .catch(() => {
                    responseHandler.sendNotFound();
                });
        }

        return sequelize.models.users
            .findAll()
            .then(userEntries => {
                if(loggedInAdmin){
                    responseHandler.sendSuccess(filterUsersAsAdmin(userEntries));
                } else {
                    responseHandler.sendSuccess(filterUsers(userEntries));
                }
            })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
            });
    };

    this.handleDelete = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        const username = req.query.username;

        if(!username){
            return responseHandler.sendBadRequest('Username is required.');
        }

        return sequelize.models.users
            .destroy({where: {username}})
            .then(() => {
                responseHandler.sendSuccess();
            })
            .catch(err => {
                responseHandler.sendNotFound(err);
            })
    };
}

module.exports = (server, sequelize) => {
    server.use(`${urls.users}/:param?`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const usersRequest = new UsersRequest({req, res, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return usersRequest.handleGet();
        case "POST":
            return usersRequest.handlePost();
        case "DELETE":
            return usersRequest.handleDelete();
        default:
            return responseHandler.sendMethodNotAllowed();
        }
    });
};