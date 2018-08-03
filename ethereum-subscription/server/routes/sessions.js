const {urls, httpCodes} = require('../../services/constants/');
const passwordHash = require('password-hash');
const {isLoggedIn, saveUser} = require('../../services/session');
const serverSettings = require('../serverSettings');
const {
    SUCCESS,
    BAD_REQUEST,
    SOMETHING_WENT_WRONG,
    METHOD_NOT_ALLOWED,
} = httpCodes;

const login = (req, res, sequelize, {username, password}) => {
    if(!username || !password){
        res.sendStatus(BAD_REQUEST);
        return;
    }

    return sequelize.models.users
        .findOne({where: {username}})
        .then(userRes => {
            if(!userRes)
                throw new Error('User does not exist.');
            if(!passwordHash.verify(password, userRes.password))
                throw new Error('Invalid password.');

            saveUser(req, userRes.dataValues);
            res.send(req.session.user);
        })
        .catch(err => {
            res.send(err.toString());
        });
};

const logout = (req, res) => {
    return isLoggedIn(req)
        .then(loggedIn => {
            if(loggedIn){
                res.clearCookie(serverSettings.COOKIE_NAME);
                res.sendStatus(SUCCESS);
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        })
        .catch(err => {
            if(global.isProduction()) console.error(err);
            res.sendStatus(SOMETHING_WENT_WRONG);
        });
};

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSession, (req, res) => {
        switch (req.method){
        case "GET":
            res.send(req.session.user);
            break;
        case "POST":
            login(req, res, sequelize, req.body);
            break;
        case "DELETE":
            logout(req, res);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};