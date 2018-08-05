const {httpCodes} = require('../../../services/constants/index');
const {SOMETHING_WENT_WRONG} = httpCodes;

const standardResponseHandler = (res, promise) => {
    return (
        promise.then(() => {
            res.sendStatus(200);
        }).catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(400);
        })
    );
};

const getAllModelEntries = (res, model) => {
    return model
        .findAll({})
        .then(entries => entries.map(entry => entry.dataValues))
        .then(entries => {
            res.send(entries);
        })
        .catch(err => {
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(SOMETHING_WENT_WRONG);
        });
};

module.exports = {
    standardResponseHandler,
    getAllModelEntries
};