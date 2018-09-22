const Request = require("./Request");
const session = require("../../services/session");
const passwordHash = require("password-hash");
const serverSettings = require("../serverSettings");

class SessionsRequest extends Request {
    constructor(params){
        super(params);

        this.handleGet = this.handleGet.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

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

                session.saveUser(this.req, userRes.dataValues);
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

    async handleGet(){
        return this.responseHandler.sendSuccess(this.req.session.user);
    };

    async handlePost(){
        return this.login();
    };

    async handleDelete(){
        return this.logout();
    };
}

module.exports = SessionsRequest;