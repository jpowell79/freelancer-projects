const Request = require("./Request");
const cookieSession = require("../services/cookieSession");
const passwordHash = require("password-hash");
const serverSettings = require("../serverSettings");

class SessionsRequest extends Request {
    constructor(params){
        super(params);
    }

    async handleGet(){
        return this.responseHandler.sendSuccess(this.req.session.user);
    };

    async handlePost(){
        return this.login();
    };

    async handleDelete(){
        return this.logout();
    };

    login(){
        const {
            username,
            password
        } = this.req.body;

        if(!username || !password){
            return this.responseHandler.sendBadRequest("Missing username or password.");
        }

        return this.sequelize.models.users
            .findOne({where: {username}})
            .then(userRes => {
                if(!userRes)
                    throw new Error("User does not exist.");
                if(!passwordHash.verify(password, userRes.password))
                    throw new Error("Invalid password.");

                cookieSession.saveUser(this.req, userRes.dataValues);
                this.responseHandler.sendSuccess(this.req.session.user);
            })
            .catch(err => this.responseHandler.sendSomethingWentWrong(err));
    };

    logout(){
        if(this.isLoggedIn()){
            this.res.clearCookie(serverSettings.COOKIE_NAME);
            return this.responseHandler.sendSuccess();
        }

        return this.responseHandler.sendUnauthorized();
    };
}

module.exports = SessionsRequest;