const Request = require("./Request");
const axios = require("axios");
const validation = require("../../services/validation");
const {roles, paths} = require("../../services/constants/index");
const serverSettings = require("../serverSettings");
const session = require("../../services/session");
const uuidv4 = require("uuid/v4");
const passwordHash = require("password-hash");
const Mailer = require("../services/api/Mailer");

class UsersRequest extends Request {
    constructor(params){
        super(params);

        this.mailer = new Mailer(params.req);

        this.handleGet = this.handleGet.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async validateGrecaptcha(){
        const secret = `secret=${serverSettings.RECAPTCHA_SECRET_KEY}`;
        const response = `response=${this.req.body.grecaptcha}`;
        const remoteip = `remoteip=${this.req.ip}`;
        const options = `?${secret}&${response}&${remoteip}`;

        return (
            axios.post(`https://www.google.com/recaptcha/api/siteverify${options}`)
                .then(response => response.data)
        );
    };

    isValidUser(){
        const {
            username,
            email,
            role,
            password,
            walletAddress
        } = this.req.body;

        if(!username || !email || !role || !password || !walletAddress){
            return this.responseHandler.sendBadRequest("Missing required fields.");
        }

        const usernameErrors = validation.getUsernameError(username);
        const passwordErrors = validation.getPasswordError(password);
        const emailErrors = validation.getEmailError(email);
        const walletAddressErrors = validation.getEthereumAddressError(walletAddress);

        if(usernameErrors !== ""){
            return this.responseHandler.sendBadRequest(usernameErrors);
        }

        if(passwordErrors !== ""){
            return this.responseHandler.sendBadRequest(passwordErrors);
        }

        if(emailErrors !== ""){
            return this.responseHandler.sendBadRequest(emailErrors);
        }

        if(walletAddressErrors !== ""){
            return this.responseHandler.sendBadRequest(walletAddressErrors);
        }

        if(role === roles.admin){
            return this.responseHandler.sendBadRequest("You cannot create admin accounts through this api.");
        }

        if(!roles[role]){
            return this.responseHandler.sendBadRequest("Role does not exist");
        }

        return true;
    };

    createUser(){
        session.saveUser(this.req, this.req.session.tempUser);
        const user = this.req.session.tempUser;

        return this.sequelize.models.users.create({
            username: user.username,
            password: user.password,
            email: user.email,
            role: user.role,
            walletAddress: user.walletAddress
        }).then(() => {
            this.req.session.tempUser = {};
            this.req.session.userWasActivated = true;
            this.responseHandler.redirect(paths.pages.login);
        }).catch(err => this.responseHandler.sendSomethingWentWrong(err));
    };

    async registerTempUser(){
        const {
            username,
            email,
            role,
            password,
            walletAddress
        } = this.req.body;

        if(!this.isValidUser()) return;

        return this.validateGrecaptcha()
            .then(recaptchaValidation => {
                if(!recaptchaValidation.success)
                    throw new Error("The reCAPTCHA could not be verified.");

                return this.sequelize.models.users.findOne({where: {username}});
            })
            .then(userRes => {
                if (userRes !== null || username === this.req.session.tempUser.username)
                    throw new Error("The username already exists.");

                session.saveTempUser(this.req, {
                    username,
                    email,
                    role,
                    password,
                    walletAddress
                }, uuidv4());

                return this.mailer.sendConfirmEmail();
            })
            .then(mailRes => {
                if(global.isDevelopment()) console.log(mailRes);
                this.responseHandler.sendSuccess();
            })
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    };

    static filterUsers(userEntries){
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

    static filterUsersAsAdmin(userEntries){
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

    async updateUser(){
        const {
            username,
            originalUsername,
            email,
            password
        } = this.req.body;

        if(!this.isLoggedIn())
            return this.responseHandler.sendUnauthorized();

        if(this.req.session.user.username !== originalUsername)
            return this.responseHandler.sendUnauthorized();

        const hashedPassword = passwordHash.generate(password);

        return this.sequelize.models.users
            .update(
                {username, email, password: hashedPassword},
                {where: {username: originalUsername}}
            )
            .then(() => this.sequelize.models.users.findOne({where: {username}}))
            .then(userRes => {
                session.saveUser(this.req, userRes.dataValues);
                this.res.send(userRes.dataValues);
            })
            .catch(err => {
                this.responseHandler.sendBadRequest(err);
            });
    };

    async handleUpdate(){
        return this.updateUser();
    }

    async handlePost(){
        return this.registerTempUser();
    };

    async handleGet(){
        const username = this.req.params.param;

        if(username && this.mailer.isValidEmailConfirmation(username)) {
            return this.createUser(this.req, this.res, this.sequelize);
        }

        if(this.req.params.param){
            return this.sequelize.models.users
                .findOne({where: {username}})
                .then(userEntry => {
                    if(this.isLoggedInAdmin()){
                        this.responseHandler.sendSuccess(UsersRequest.filterUsersAsAdmin([userEntry]));
                    } else {
                        this.responseHandler.sendSuccess(UsersRequest.filterUsers([userEntry]))
                    }
                })
                .catch(() => {
                    this.responseHandler.sendNotFound();
                });
        }

        return this.sequelize.models.users
            .findAll()
            .then(userEntries => {
                if(this.isLoggedInAdmin()){
                    this.responseHandler.sendSuccess(UsersRequest.filterUsersAsAdmin(userEntries));
                } else {
                    this.responseHandler.sendSuccess(UsersRequest.filterUsers(userEntries));
                }
            })
            .catch(err => {
                this.responseHandler.sendSomethingWentWrong(err);
            });
    }

    async handleDelete(){
        if(!this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        const username = this.req.query.username;

        if(!username)
            return this.responseHandler.sendBadRequest("Username is required.");

        return this.sequelize.models.users
            .destroy({where: {username}})
            .then(() => this.responseHandler.sendSuccess())
            .catch(err => this.responseHandler.sendNotFound(err))
    };
}

module.exports = UsersRequest;