const {urls, paths, httpCodes} = require('../../services/constants/');
const {isLoggedInAdmin} = require('../../services/session');
const formidable = require('formidable');
const fs = require('fs');
const {
    SUCCESS,
    UNAUTHORIZED,
    BAD_REQUEST,
    METHOD_NOT_ALLOWED,
} = httpCodes;

const upload = (res, file, path) => {
    fs.copyFile(file.path, `client/${path}/${file.name}`, (err) => {
        if(err){
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(BAD_REQUEST);
            return;
        }

        res.sendStatus(SUCCESS);
    });
};

const checkTypeThenUpload = (res, file) => {
    if(file.type.startsWith('image')){
        upload(res, file, paths.static.images);
    } else if(file.type.startsWith('audio')){
        upload(res, file, paths.static.audio);
    } else if(file.type.startsWith('video')){
        upload(res, file, paths.static.video);
    } else {
        upload(res, file, paths.static.files);
    }
};

const handlePost = async (req, res) => {
    const loggedInAdmin = await isLoggedInAdmin(req);

    if(!loggedInAdmin){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        const file = files.file;

        if(err || !file){
            if(global.isDevelopment()) console.error(err);
            res.sendStatus(BAD_REQUEST);
            return;
        }

        checkTypeThenUpload(res, file);
    });
};

module.exports = (server) => {
    server.use(urls.upload, server.initSession, (req, res) => {
        switch (req.method){
        case "POST":
            handlePost(req, res, req.body);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};