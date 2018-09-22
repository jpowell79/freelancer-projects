const {urls} = require("../../services/constants/");
const DownloadReqeust = require("../request/DownloadRequest");

module.exports = (server, sequelize) => {
    server.use(`${urls.download}/:dump?`, server.initSession, (req, res) => {
        return new DownloadReqeust({req, res, sequelize}).handle();
    });
};