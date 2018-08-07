const testSettings = require('../serverTestSettings');
const configServer = require('../../config/configServer');
const configSequelize = require('../../config/configSequelize');
const loadTestDatabase = require('./loadTestDatabase');
const {removeDatabase} = require('../../services/database/databaseUtils');
require('../../config/addGlobalHelpers')();

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
                const server = configServer(mockApp, global.sequelize);
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