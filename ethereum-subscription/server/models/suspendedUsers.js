const {model} = require("./users");

module.exports = (sequelize) => sequelize.define("suspendedUsers", model);