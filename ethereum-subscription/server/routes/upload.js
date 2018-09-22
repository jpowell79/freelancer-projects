const {urls} = require("../../services/constants/");
const UploadRequest = require("../request/UploadRequest");

module.exports = (server, sequelize) => {
    server.use(urls.upload, server.initSession, (req, res) => {
        return new UploadRequest({req, res, sequelize}).handle();
    });
};