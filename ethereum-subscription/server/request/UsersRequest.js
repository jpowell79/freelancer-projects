const Request = require("./Request");
const {roles, paths} = require("../../services/constants/index");
const cookieSession = require("../services/cookieSession");
const uuidv4 = require("uuid/v4");
const passwordHash = require("password-hash");
const Emailer = require("../services/email/Emailer");
const FieldValidator = require("../../services/FieldValidator");
const grecaptcha = require("../services/grecaptcha");

class UsersRequest extends Request {
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

    constructor(params){
        super(params);

        this.emailer = new Emailer(params.req);
        this.model = this.sequelize.models.users;
    }

    async handleUpdate(){
        return this.updateUser();
    }

    async handlePost(){
        return this.registerTempUser();
    };

    async handleGet(){
        const username = this.req.params.param;

        if(this.isEmailConfirmation()){
            return this.createUser(this.req, this.res, this.sequelize);
        } else if(username){
            return this.getUser(username);
        }

        return this.getAllUsers();
    }

    async handleDelete(){
        if(!this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        const username = this.req.query.username;

        if(!username)
            return this.responseHandler.sendBadRequest("Username is required.");

        return this.model
            .destroy({where: {username}})
            .then(() => this.responseHandler.sendSuccess())
            .catch(err => this.responseHandler.sendNotFound(err))
    };

    isEmailConfirmation(){
        if(!this.req.params.param) return false;

        return this.req.params.param === this.req.session.tempUser.uuid;
    }

    async getUser(username){
        return this.model
            .findOne({where: {username}})
            .then(userEntry => {
                if(this.isLoggedInAdmin()){
                    this.responseHandler.sendSuccess(UsersRequest.filterUsersAsAdmin([userEntry]));
                } else {
                    this.responseHandler.sendSuccess(UsersRequest.filterUsers([userEntry]))
                }
            })
            .catch(() => this.responseHandler.sendNotFound());
    }

    async getAllUsers(){
        return this.model
            .findAll()
            .then(userEntries => {
                if(this.isLoggedInAdmin()){
                    this.responseHandler.sendSuccess(UsersRequest.filterUsersAsAdmin(userEntries));
                } else {
                    this.responseHandler.sendSuccess(UsersRequest.filterUsers(userEntries));
                }
            })
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    }

    isValidUser(){
        const user = this.req.body;
        const errors = new FieldValidator(user).validateFields().getErrors({strings: true});

        if(user.role === roles.admin){
            errors.push("You cannot create admin accounts through this API");
        }

        if(errors.length > 0) {
            this.responseHandler.sendBadRequest(errors);
            return false;
        }

        return true;
    };

    async createUser(){
        cookieSession.saveUser(this.req, this.req.session.tempUser);
        const user = this.req.session.tempUser;

        return this.model.create({
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

        return grecaptcha.validate(this.req)
            .then(recaptchaValidation => {
                if(!recaptchaValidation.success)
                    throw new Error("The reCAPTCHA could not be verified.");

                return this.sequelize.models.users.findOne({where: {username}});
            })
            .then(userRes => {
                if (userRes !== null || username === this.req.session.tempUser.username)
                    throw new Error("The username already exists.");

                cookieSession.saveTempUser(this.req, {
                    username,
                    email,
                    role,
                    password,
                    walletAddress
                }, uuidv4());

                return this.emailer.sendConfirmEmail();
            })
            .then(mailRes => {
                if(global.isDevelopment()) console.log(mailRes);
                this.responseHandler.sendSuccess();
            })
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
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

        return this.model
            .update(
                {username, email, password: hashedPassword},
                {where: {username: originalUsername}}
            )
            .then(() => this.model.findOne({where: {username}}))
            .then(userRes => {
                cookieSession.saveUser(this.req, userRes.dataValues);
                this.res.send(userRes.dataValues);
            })
            .catch(err => this.responseHandler.sendBadRequest(err));
    };
}

module.exports = UsersRequest;