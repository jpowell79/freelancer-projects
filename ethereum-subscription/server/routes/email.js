const {urls} = require('../../services/constants');
const RequestFactory = require("../services/api/request/RequestFactory");

module.exports = (server, sequelize) => {
    server.use(`${urls.email}/:type`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.email, req, res, sequelize})
            .handle();
    });
};