const Request = require("./Request");
const {roles, paths, actions} = require("../../services/constants");
const cookieSession = require("../services/cookieSession");
const uuidv4 = require("uuid/v4");
const passwordHash = require("password-hash");
const Emailer = require("../services/email/Emailer");
const FieldValidator = require("../../services/FieldValidator");
const grecaptcha = require("../services/grecaptcha");
const {Transaction, Op} = require("sequelize");

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
        const action = this.req.params.param ? this.req.params.param : "";

        switch(action){
        case actions.restorePassword:
            return this.restorePassword();
        case actions.suspendSupplier:
            return this.suspendSupplier();
        case actions.unsuspendSupplier:
            return this.unsuspendSupplier();
        default:
            return this.registerTempUser();
        }
    };

    async handleGet(){
        const action = this.req.params.param;

        if(this.isEmailConfirmation()){
            return this.createUser(this.req, this.res, this.sequelize);
        } else if(action === actions.getSuspendedSuppliers) {
            return this.getSuspendedSuppliers();
        } else if(action){
            return this.getUser(action);
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

    async getSuspendedSuppliers(){
        return this.sequelize.models.suspendedUsers.findAll()
            .then(users => {
                if(this.isLoggedInAdmin()){
                    return this.responseHandler
                        .sendSuccess(UsersRequest.filterUsersAsAdmin(users));
                } else {
                    return this.responseHandler.sendSuccess([]);
                }
            })
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    }

    async suspendSupplier(){
        const {username} = this.req.body;

        if(!this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        return this.responseHandler.handlePromiseResponse(
            this.sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, transaction => {
                return this.model.findOne({
                    where: {username},
                    transaction
                }).then(userRes => userRes.dataValues)
                    .then(user => {
                        if(user.role === roles.admin){
                            throw new Error("You cannot suspend an admin account");
                        }

                        return this.sequelize.models.suspendedUsers.create(user, {transaction});
                    })
                    .then(() => this.model.destroy({
                        where: {username},
                        transaction
                    }));
            })
        );
    }

    async unsuspendSupplier(){
        const {username} = this.req.body;

        if(!this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        return this.responseHandler.handlePromiseResponse(
            this.sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
            }, transaction => {
                return this.sequelize.models.suspendedUsers.findOne({
                    where: {username},
                    transaction
                }).then(userRes => userRes.dataValues)
                    .then(user => this.model.create(user, {transaction}))
                    .then(() => this.sequelize.models.suspendedUsers.destroy({
                        where: {username},
                        transaction
                    }));
            })
        );
    }

    async restorePassword(){
        const {password} = this.req.body;
        const tempUser = this.req.session.tempUser;
        this.req.session.tempUser = {};
        const hashedPassword = passwordHash.generate(password);

        return this.responseHandler.handlePromiseResponse(
            this.model.update({password: hashedPassword}, {
                where: {username: tempUser.username}
            }).then(() => {
                this.req.session.restorePassword = false;
            })
        );
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

    isEmailConfirmation(){
        if(!this.req.params.param) return false;

        return this.req.params.param === this.req.session.tempUser.uuid;
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

    checkIfUserExists(user){
        if(!user) return;

        const {username, email} = this.req.body;

        if(user.email === email)
            throw new Error("A user with the given email already exists");
        if(user.username === username){
            throw new Error("The username already exists.");
        }
    }

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

                return this.sequelize.models.users.findOne({
                    where: {
                        [Op.or]: [{username}, {email}]
                    }
                });
            })
            .then(userRes => {
                this.checkIfUserExists(userRes);
                this.checkIfUserExists(this.req.session.tempUser);

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