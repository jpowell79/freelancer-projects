"use strict";

const Request = require('./Request');
const strings = require('../../../../services/strings');

class SettingsRequest extends Request {
    constructor(params){
        super(params);

        this.handleGet = this.handleGet.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    isValidRequest(){
        const {name} = this.req.body;

        if(!strings.isDefined(name)){
            this.responseHandler.sendBadRequest('Setting name is required');
            return false;
        }

        if(!this.isLoggedInAdmin()){
            this.responseHandler.sendUnauthorized();
            return false;
        }

        return true;
    }

    async handleGet(){
        const name = this.req.params.name;

        if(!strings.isDefined(name)){
            return this.sequelize.models.settings
                .findAll()
                .then(settings => this.responseHandler.sendSuccess(settings))
                .catch(err => this.responseHandler.sendSomethingWentWrong(err));
        }

        return this.sequelize.models.settings
            .findOne({where: {name}})
            .then(setting => {
                if(!setting) throw new Error("No setting with the given name exists.");
                this.responseHandler.sendSuccess(setting)
            })
            .catch(err => this.responseHandler.sendNotFound(err));
    };

    async handleUpdate(){
        if(!this.isValidRequest()) return;

        const {name, value} = this.req.body;

        return this.sequelize.models.settings
            .update({name, value}, {where: {name}})
            .then(affectedRows => {
                if(affectedRows[0] === '0' || affectedRows[0] === 0)
                    throw new Error("No setting with the given name exists.");

                this.responseHandler.sendSuccess(affectedRows);
            })
            .catch(err => this.responseHandler.sendBadRequest(err));
    }

    async handlePost(){
        if(!this.isValidRequest()) return;

        const {name, value} = this.req.body;

        return this.sequelize.models.settings
            .create({name, value})
            .then(() => this.responseHandler.sendSuccess())
            .catch(err => this.responseHandler.sendBadRequest(err));
    };
}

module.exports = SettingsRequest;