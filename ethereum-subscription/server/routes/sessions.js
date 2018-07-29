const urls = require('../../services/urls');
const passwordHash = require('password-hash');
const {isLoggedIn, saveUser} = require('../../services/session');
const serverSettings = require('../serverSettings');

const login = (req, res, sequelize, {username, password}) => {
    if(!username || !password){
        res.sendStatus(400);
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
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        })
        .catch(() => {
            res.sendStatus(500);
        });
};

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSessionVariables, (req, res) => {
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
            res.sendStatus(405);
            break;
        }
    });
};