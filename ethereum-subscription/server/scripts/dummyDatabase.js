const configSequelize = require("../config/configSequelize");
const {removeDatabase} = require("../services/database/databaseUtils");
const serverSettings = require("../serverSettings");
const dummyDatabase = require("../services/database/dummyDatabase");

module.exports = async () => configSequelize(serverSettings, false)
    .then(sequelize => removeDatabase(sequelize, serverSettings.DATABASE_NAME))
    .then(() => configSequelize(serverSettings, false))
    .then(sequelize => dummyDatabase.load(sequelize));