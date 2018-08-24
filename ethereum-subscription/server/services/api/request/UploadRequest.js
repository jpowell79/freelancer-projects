"use strict";

const Request = require('./Request');
const {paths} = require('../../../../services/constants/');
const formidable = require('formidable');
const fs = require('fs');

class UploadRequest extends Request {
    constructor(params){
        super(params);

        this.handlePost = this.handlePost.bind(this);
    }

    upload(file, path){
        fs.copyFile(file.path, `client/${path}/${file.name}`, (err) => {
            if(err){
                return this.responseHandler.sendSomethingWentWrong(err);
            }

            this.responseHandler.sendSuccess();
        });
    };

    checkTypeThenUpload(file){
        if(file.type.startsWith('image')){
            return this.upload(file, paths.static.images);
        } else if(file.type.startsWith('audio')){
            return this.upload(file, paths.static.audio);
        } else if(file.type.startsWith('video')){
            return this.upload(file, paths.static.video);
        } else {
            return this.upload(file, paths.static.files);
        }
    };

    async handlePost(){
        if(this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        const form = new formidable.IncomingForm();

        form.parse(this.req, (err, fields, files) => {
            const file = files.file;

            if(err || !file){
                return this.responseHandler.sendBadRequest(err);
            }

            this.checkTypeThenUpload(file);
        });
    }
}

module.exports = UploadRequest;