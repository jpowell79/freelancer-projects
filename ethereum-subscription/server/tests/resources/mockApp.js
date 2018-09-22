require("../../config/defineGlobals");
const testSettings = require("../serverTestSettings");
const configApp = require("../../config/configApp");
const configSequelize = require("../../config/configSequelize");
const loadTestDatabase = require("./loadTestDatabase");
const {removeDatabase} = require("../../services/database/databaseUtils");

module.exports = async () => {
    const mockApp = {
        render: () => {},
        getRequestHandler: () => {
            return () => {};
        }
    };

    if(!global.app){
        return configSequelize(testSettings)
            .then(sequelize => removeDatabase(sequelize, testSettings.DATABASE_NAME))
            .then(() => configSequelize(testSettings))
            .then(sequelize => {
                global.sequelize = sequelize;
                return loadTestDatabase(sequelize);
            })
            .then(() => {
                const server = configApp(mockApp, global.sequelize);
                return server.listen(testSettings.PORT);
            })
            .then(app => {
                global.app = app;
                return app;
            }).catch(err => {
                console.error(err);
                process.exit(1);
            });
    }

    return global.app;
};