const {urls} = require("../../services/constants/");
const SessionsRequest = require("../request/SessionsRequest");

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSession, (req, res) => {
        return new SessionsRequest({req, res, sequelize}).handle();
    });
};