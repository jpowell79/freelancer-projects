const {urls, httpCodes} = require('../../services/constants/');
const strings = require('../../services/strings');
const {isLoggedInAdmin} = require('../../services/session');
const {
    SUCCESS,
    UNAUTHORIZED,
    BAD_REQUEST,
    SOMETHING_WENT_WRONG,
    METHOD_NOT_ALLOWED,
    NOT_FOUND
} = httpCodes;

const handleGet = (res, sequelize, name) => {
    if(!strings.isDefined(name)){
        return sequelize.models.settings
            .findAll()
            .then(settings => {
                res.status(SUCCESS).send(settings);
            })
            .catch(err => {
                res.status(SOMETHING_WENT_WRONG).send(err.toString());
            });
    }

    return sequelize.models.settings
        .findOne({where: {name}})
        .then(setting => {
            if(!setting) throw new Error("No setting with the given name exists.");
            res.send(setting);
        })
        .catch(err => {
            res.status(NOT_FOUND).send(err.toString());
        });
};

const handlePost = async (req, res, sequelize, {name, value, update}) => {
    if(!strings.isDefined(name)){
        res.sendStatus(BAD_REQUEST);
        return;
    }

    //TODO: Give suppliers access to certain settings
    const loggedInAdmin = await isLoggedInAdmin(req);

    if(!loggedInAdmin){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    if(update){
        return sequelize.models.settings
            .update({name, value}, {where: {name}})
            .then(affectedRows => {
                if(affectedRows[0] === '0' || affectedRows[0] === 0)
                    throw new Error("No setting with the given name exists.");

                res.status(SUCCESS).send(affectedRows);
            })
            .catch(err => {
                res.status(NOT_FOUND).send(err.toString());
            });
    } else {
        return sequelize.models.settings
            .create({name, value})
            .then(() => {
                res.sendStatus(SUCCESS);
            })
            .catch(err => {
                res.status(BAD_REQUEST).send(err.toString());
            });
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.settings}/:name?`, server.initSession, (req, res) => {
        switch (req.method){
        case "GET":
            handleGet(res, sequelize, req.params.name);
            break;
        case "POST":
            handlePost(req, res, sequelize, req.body);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};