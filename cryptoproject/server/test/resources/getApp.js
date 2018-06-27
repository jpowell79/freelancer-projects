const next = require('next');
const siteSettings = require('../../../site-settings');
const Settings = require('../../config/Settings');
const configMongo = require('../../config/configMongo');
const configServer = require('../../config/configServer');

let getApp = next({
    dev: process.env.NODE_ENV !== 'production'
});

module.exports = () => {
    return getApp.prepare().then(() => {
        let db = configMongo();
        let server = configServer(db, getApp);
        return server.listen(3300);
    });
};