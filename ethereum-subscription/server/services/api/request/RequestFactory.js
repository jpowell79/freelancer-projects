const {urls} = require('../../../../services/constants');
const ResponseHandler = require('../ResponseHandler');
const DownloadRequest = require('./DownloadRequest');
const EmailRequest = require("./EmailRequest");
const SessionsRequest = require("./SessionsRequest");
const SettingsRequest = require("./SettingsRequest");
const SubscriptionsRequest = require("./SubscriptionsRequest");
const UploadRequest = require("./UploadRequest");
const UsersRequest = require("./UsersRequest");

class RequestFactory {
    static newRequest({url, req, res, sequelize}){
        const responseHandler = new ResponseHandler(res);
        const params = {req, res, sequelize, responseHandler};

        switch(url){
        case urls.download:
            return new DownloadRequest(params);
        case urls.email:
            return new EmailRequest(params);
        case urls.sessions:
            return new SessionsRequest(params);
        case urls.settings:
            return new SettingsRequest(params);
        case urls.subscriptions:
            return new SubscriptionsRequest(params);
        case urls.upload:
            return new UploadRequest(params);
        case urls.users:
            return new UsersRequest(params);
        default:
            throw new Error(`Unexpected url ${url}`);
        }
    }
}

module.exports = RequestFactory;