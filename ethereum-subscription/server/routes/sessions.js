const urls = require('../../services/urls');
const passwordHash = require('password-hash');
const isLoggedIn = require('../services/session').isLoggedIn;

const login = (res, sequelize, {username, password}) => {
    if(!username || !password){
        res.sendStatus(400);
        return;
    }

    return sequelize.models.users
        .findOne({where: {username}})
        .then(user => {
            if(!user)
                throw new Error('User does not exist.');
            if(!passwordHash.verify(password, user.password))
                throw new Error('Invalid password.');

            global.user = user.dataValues;
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send(err.toString());
        });
};

const logout = (req, res) => {
    if(isLoggedIn(req)){
        res.clearCookie('session');
        global.user = null;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, (req, res) => {
        switch (req.method){
        case "POST":
            login(res, sequelize, req.body);
            break;
        case "DELETE":
            logout(req, res);
            break;
        default:
            res.sendStatus(400);
            break;
        }
    });
};