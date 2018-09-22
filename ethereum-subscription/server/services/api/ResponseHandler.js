"use strict";

const {httpCodes} = require("../../../services/constants/index");
const {
    SUCCESS,
    SOMETHING_WENT_WRONG,
    BAD_REQUEST,
    UNAUTHORIZED,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
    REDIRECT,
    CREATED
} = httpCodes;

class ResponseHandler {
    constructor(res){
        this.res = res;
    }

    redirect(page){
        this.res.redirect(REDIRECT, page);
    };

    sendSuccess(data = {}){
        this.res.send(data);
    };

    sendCreated(){
        this.res.sendStatus(CREATED);
    };

    sendNotFound(err = ""){
        if(global.isDevelopment()) console.error(err);
        this.res.status(NOT_FOUND).send(err.toString());
    };

    sendUnauthorized(){
        this.res.sendStatus(UNAUTHORIZED);
    };

    sendMethodNotAllowed(){
        this.res.sendStatus(METHOD_NOT_ALLOWED);
    };

    sendSomethingWentWrong(err = ""){
        if(global.isDevelopment()) console.error(err);
        this.res.status(SOMETHING_WENT_WRONG).send(err.toString());
    };

    sendBadRequest(err = ""){
        if(global.isDevelopment()) console.error(err);
        this.res.status(BAD_REQUEST).send(err.toString());
    };

    handlePromiseResponse(promise){
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