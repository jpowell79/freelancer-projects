const RequestFactory = require("../services/api/request/RequestFactory");
const {urls} = require('../../services/constants/');

module.exports = (server) => {
    server.use(urls.upload, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.upload, req, res, sequelize})
            .handle();
    });
};