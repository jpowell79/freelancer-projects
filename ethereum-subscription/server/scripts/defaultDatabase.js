const configSequelize = require("../config/configSequelize");
const {removeDatabase} = require("../services/database/databaseUtils");
const serverSettings = require("../serverSettings");

module.exports = async () => configSequelize(serverSettings, false)
    .then(sequelize => removeDatabase(sequelize, serverSettings.DATABASE_NAME))
    .then(() => configSequelize(serverSettings));