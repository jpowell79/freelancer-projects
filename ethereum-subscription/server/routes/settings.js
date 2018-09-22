const RequestFactory = require("../request/RequestFactory");
const {urls} = require("../../services/constants/");

module.exports = (server, sequelize) => {
    server.use(`${urls.settings}/:name?`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.settings, req, res, sequelize})
            .handle();
    });
};