const {httpCodes} = require('../../../services/constants/index');
const {isLoggedInAdmin} = require('../../../services/session');
const {getAllModelEntries} = require('./apiUtils');
const {
    SUCCESS,
    CREATED,
    UNAUTHORIZED,
    BAD_REQUEST,
} = httpCodes;

function SubscriptionTypes({req, res, sequelize}){
    this.model = sequelize.models.subscriptionTypes;

    this.create = ({name}) => {
        return this.model.create({name});
    };

    this.update = ({id, name}) => {
        return this.model.update({name}, {where: {id}});
    };

    this.sendGetAll = async () => getAllModelEntries(res, this.model);

    this.sendUpdate = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            res.sendStatus(UNAUTHORIZED);
            return;
        }

        const {name, id} = req.body;

        if(!name || !id){
            res.sendStatus(BAD_REQUEST);
            return;
        }

        return this.update({name, id})
            .then(() => {
                res.sendStatus(SUCCESS);
            })
            .catch(err => {
                if(global.isDevelopment()) console.error(err);
                res.sendStatus(BAD_REQUEST);
            });
    };

    this.sendCreate = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            res.sendStatus(UNAUTHORIZED);
            return;
        }

        const {name} = req.body;

        if(!name){
            res.sendStatus(BAD_REQUEST);
            return;
        }

        return this.create({name})
            .then(() => {
                res.sendStatus(CREATED);
            })
            .catch(err => {
                if(global.isDevelopment()) console.error(err);
                res.sendStatus(BAD_REQUEST);
            });
    }
}

module.exports = SubscriptionTypes;