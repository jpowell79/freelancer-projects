const {urls} = require("../../services/constants/");
const RequestFactory = require("../request/RequestFactory");

module.exports = (server, sequelize) => {
    server.use(`${urls.sessions}`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.sessions, req, res, sequelize})
            .handle();
    });
};