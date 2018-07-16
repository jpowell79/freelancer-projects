const configMongoose = require('../../config/configMongoose');
const configServer = require('../../config/configServer');
const siteSettings = require('../../../site-settings');

let mockApp = {
    render: () => {},
    getRequestHandler: () => {
        return () => {};
    }
};

let mongoose = configMongoose();
const MONGODB_URI = process.env.MONGODB_URI || siteSettings.MONGODB_URI;
const db =  mongoose.connect(MONGODB_URI);
let server = configServer(mockApp, db);

module.exports = server.listen(3300);