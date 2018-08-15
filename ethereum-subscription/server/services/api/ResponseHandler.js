const {httpCodes} = require('../../../services/constants/index');
const {
    SUCCESS,
    SOMETHING_WENT_WRONG,
    BAD_REQUEST,
    UNAUTHORIZED,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
    CREATED
} = httpCodes;

function ResponseHandler(res){
    this.res = res;

    this.sendSuccess = (data = {}) => {
        this.res.send(data);
    };

    this.sendCreated = () => {
        this.res.sendStatus(CREATED);
    };

    this.sendNotFound = (err = '') => {
        this.res.status(NOT_FOUND).send(err.toString());
    };

    this.sendUnauthorized = () => {
        this.res.sendStatus(UNAUTHORIZED);
    };

    this.sendMethodNotAllowed = () => {
        this.res.sendStatus(METHOD_NOT_ALLOWED);
    };

    this.sendSomethingWentWrong = (err = '') => {
        if(global.isDevelopment()) console.error(err);
        this.res.status(SOMETHING_WENT_WRONG).send(err.toString());
    };

    this.sendBadRequest = (err = '') => {
        if(global.isDevelopment()) console.error(err);
        this.res.status(BAD_REQUEST).send(err.toString());
    };

    this.handleResponse = (promise) => {
        return (
            promise.then(() => {
                this.res.sendStatus(SUCCESS);
            }).catch(err => {
                this.sendSomethingWentWrong(err);
            })
        );
    };
}

module.exports = ResponseHandler;