"use strict";

const objects = require('../../../../services/objects');
const {roles} = require('../../../../services/constants');

class Request {
    constructor({req, res, sequelize, responseHandler}){
        this.req = req;
        this.res = res;
        this.sequelize = sequelize;
        this.responseHandler = responseHandler;
    }

    isLoggedIn(){
        return !objects.isEmpty(this.req.session.user);
    }

    isLoggedInAdmin(){
        return this.isLoggedIn() && this.req.session.user.role === roles.admin;
    }

    handle(){
        switch(this.req.method){
        case "GET":
            return this.handleGet();
        case "POST":
            if(this.req.body && this.req.body.update){
                return this.handleUpdate();
            }

            return this.handlePost();
        case "DELETE":
            return this.handleDelete();
        default:
            return this.responseHandler.sendMethodNotAllowed();
        }
    };

    async handleGet(){
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handlePost(){
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handleDelete(){
        return this.responseHandler.sendMethodNotAllowed();
    }

    async handleUpdate(){
        return this.responseHandler.sendMethodNotAllowed();
    }
}

module.exports = Request;