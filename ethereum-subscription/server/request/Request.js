const objects = require("../../services/datatypes/objects");
const {roles} = require("../../services/constants");
const ResponseHandler = require("../services/api/ResponseHandler");

class Request {
    constructor({req, res, sequelize}){
        this.req = req;
        this.res = res;
        this.sequelize = sequelize;
        this.responseHandler = new ResponseHandler(res);
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

    isLoggedIn(){
        return !objects.isEmpty(this.req.session.user);
    }

    isLoggedInAdmin(){
        return this.isLoggedIn() && this.req.session.user.role === roles.admin;
    }
}

module.exports = Request;