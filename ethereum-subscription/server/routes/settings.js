const urls = require('../../services/urls');
const strings = require('../../services/strings');

const handleGet = (res, sequelize, name) => {
    if(!strings.isDefined(name)){
        return sequelize.models.settings
            .findAll()
            .then(settings => {
                res.status(200).send(settings);
            })
            .catch(err => {
                res.status(403).send(err.toString());
            });
    }

    return sequelize.models.settings
        .findOne({where: {name}})
        .then(setting => {
            if(!setting) throw new Error("No setting with the given name exists.");
            res.send(setting);
        })
        .catch(err => {
            res.status(404).send(err.toString());
        });
};

const handlePost = (res, sequelize, {name, value, update}) => {
    if(!strings.isDefined(name)){
        res.sendStatus(400);
        return;
    }

    if(update){
        return sequelize.models.settings
            .update({name, value}, {where: {name}})
            .then(affectedRows => {
                if(affectedRows[0] === 0)
                    throw new Error("No setting with the given name exists.");

                res.status(200).send(response);
            })
            .catch(err => {
                res.status(404).send(err.toString());
            });
    } else {
        return sequelize.models.settings
            .create({name, value})
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.status(400).send(err.toString());
            });
    }
};

module.exports = (server, sequelize) => {
    server.use(`${urls.settings}/:name?`, (req, res) => {
        switch (req.method){
        case "GET":
            handleGet(res, sequelize, req.params.name);
            break;
        case "POST":
            //TODO: Check authentication.
            handlePost(res, sequelize, req.body);
            break;
        default:
            res.sendStatus(405);
            break;
        }
    });
};