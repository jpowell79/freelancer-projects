const {urls} = require('../../services/constants/');
const RequestFactory = require("../services/api/request/RequestFactory");

module.exports = (server, sequelize) => {
    server.use(`${urls.users}/:param?`, server.initSession, (req, res) => {
        return RequestFactory
            .newRequest({url: urls.users, req, res, sequelize})
            .handle();
    });
};