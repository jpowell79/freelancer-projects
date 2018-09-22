const {urls} = require("../../services/constants/");
const SettingsRequest = require("../request/SettingsRequest");

module.exports = (server, sequelize) => {
    server.use(`${urls.settings}/:name?`, server.initSession, (req, res) => {
        return new SettingsRequest({req, res, sequelize}).handle();
    });
};