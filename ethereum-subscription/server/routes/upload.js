const {urls, paths} = require('../../services/constants/');
const {isLoggedInAdmin} = require('../../services/session');
const formidable = require('formidable');
const fs = require('fs');
const ResponseHandler = require('../services/api/ResponseHandler');

function UploadRequest({req, res, responseHandler}){
    const upload = (file, path) => {
        fs.copyFile(file.path, `client/${path}/${file.name}`, (err) => {
            if(err){
                return responseHandler.sendSomethingWentWrong(err);
            }

            responseHandler.sendSuccess();
        });
    };

    const checkTypeThenUpload = (file) => {
        if(file.type.startsWith('image')){
            upload(file, paths.static.images);
        } else if(file.type.startsWith('audio')){
            upload(file, paths.static.audio);
        } else if(file.type.startsWith('video')){
            upload(file, paths.static.video);
        } else {
            upload(file, paths.static.files);
        }
    };

    this.handlePost = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            const file = files.file;

            if(err || !file){
                return responseHandler.sendBadRequest(err);
            }

            checkTypeThenUpload(file);
        });
    };
}

module.exports = (server) => {
    server.use(urls.upload, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const uploadRequest = new UploadRequest({req, res, responseHandler});

        switch (req.method){
        case "POST":
            return uploadRequest.handlePost();
        default:
            return responseHandler.sendMethodNotAllowed();
        }
    });
};