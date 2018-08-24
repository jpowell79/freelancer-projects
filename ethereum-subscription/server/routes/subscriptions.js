const RequestFactory = require("../services/api/request/RequestFactory");
const {urls} = require('../../services/constants/');

module.exports = (server, sequelize) => {
    server.use(`${urls.subscriptions}`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.subscriptions, req, res, sequelize})
            .handle();
    });
};