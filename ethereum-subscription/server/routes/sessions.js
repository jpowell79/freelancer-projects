const {urls} = require('../../services/constants/');
const passwordHash = require('password-hash');
const {isLoggedIn, saveUser} = require('../../services/session');
const ResponseHandler = require('../services/api/ResponseHandler');
const serverSettings = require('../serverSettings');

const login = (req, res, sequelize, {username, password}, responseHandler) => {
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

const logout = (req, res, responseHandler) => {
    return isLoggedIn(req)
        .then(loggedIn => {
            if(loggedIn){
                res.clearCookie(serverSettings.COOKIE_NAME);
                responseHandler.sendSuccess();
            } else {
                responseHandler.sendUnauthorized();
            }
        })
        .catch(err => {
            responseHandler.sendSomethingWentWrong(err);
        });
};

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);

        switch (req.method){
        case "GET":
            responseHandler.sendSuccess(req.session.user);
            break;
        case "POST":
            login(req, res, sequelize, req.body, responseHandler);
            break;
        case "DELETE":
            logout(req, res, responseHandler);
            break;
        default:
            responseHandler.sendMethodNotAllowed();
            break;
        }
    });
};