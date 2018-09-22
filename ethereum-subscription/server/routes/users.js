const {urls} = require("../../services/constants/");
const UsersRequest = require("../request/UsersRequest");

module.exports = (server, sequelize) => {
    server.use(`${urls.users}/:param?`, server.initSession, (req, res) => {
        return new UsersRequest({req, res, sequelize}).handle();
    });
};