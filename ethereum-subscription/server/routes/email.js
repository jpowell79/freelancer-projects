const {urls} = require("../../services/constants");
const EmailRequest = require("../request/EmailRequest");

module.exports = (server, sequelize) => {
    server.use(`${urls.email}/:type/:uuid?`, server.initSession, (req, res) => {
        return new EmailRequest({req, res, sequelize}).handle();
    });
};