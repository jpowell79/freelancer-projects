const {urls} = require('../../services/constants/');
const passwordHash = require('password-hash');
const {isLoggedIn, saveUser} = require('../../services/session');
const ResponseHandler = require('../services/api/ResponseHandler');
const serverSettings = require('../serverSettings');

function SessionsRequest({req, sequelize, responseHandler}){
    const login = () => {
        const {
            username,
            password
        } = req.body;

        if(!username || !password){
            return responseHandler.sendBadRequest('Missing username or password.');
        }

        return sequelize.models.users
            .findOne({where: {username}})
            .then(userRes => {
                if(!userRes)
                    throw new Error('User does not exist.');
                if(!passwordHash.verify(password, userRes.password))
                    throw new Error('Invalid password.');

                saveUser(req, userRes.dataValues);
                responseHandler.sendSuccess(req.session.user);
            })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
            });
    };

    const logout = () => {
        return isLoggedIn(req)
            .then(loggedIn => {
                if(loggedIn){
                    responseHandler.res.clearCookie(serverSettings.COOKIE_NAME);
                    responseHandler.sendSuccess();
                } else {
                    responseHandler.sendUnauthorized();
                }
            })
            .catch(err => {
                responseHandler.sendSomethingWentWrong(err);
            });
    };

    this.handleGet = async () => responseHandler.sendSuccess(req.session.user);
    this.handlePost = async () => login();
    this.handleDelete = async () => logout();
}

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const sessionsRequest = new SessionsRequest({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return sessionsRequest.handleGet();
        case "POST":
            return sessionsRequest.handlePost();
        case "DELETE":
            return sessionsRequest.handleDelete();
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    });
};