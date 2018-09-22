const {urls} = require("../../services/constants/");
const RequestFactory = require("../request/RequestFactory");

module.exports = (server, sequelize) => {
    server.use(`${urls.download}/:dump?`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.download, req, res, sequelize})
            .handle();
    });
};