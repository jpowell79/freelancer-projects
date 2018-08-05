const {httpCodes} = require('../../../services/constants/index');
const {isLoggedInAdmin} = require('../../../services/session');
const {getAllModelEntries} = require('./apiUtils');
const {
    CREATED,
    UNAUTHORIZED,
    BAD_REQUEST,
} = httpCodes;

function SubscriptionTypes({req, res, sequelize}){
    this.model = sequelize.models.subscriptionTypes;

    this.sendGetAll = async () => getAllModelEntries(res, this.model);

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

        return this.model
            .create({name})
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