const Sequelize = require('sequelize');
const glob = require('glob');
const defaultDatabase = require('./defaultDatabase');

function createDatabaseIfNotExists(sequelizeOptions, dbName){
    const sequelize = new Sequelize(sequelizeOptions);

    return sequelize
        .query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
        .then(() => sequelize.close());
}

function loadDefaultDatabaseSettings(sequelize){
    return sequelize.models.settings
        .findAll()
        .then(settings => {
            if(settings.length === 0){
                return defaultDatabase.loadDefaultSettings(sequelize);
            }
        });
}

module.exports = async ({
    HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_DIALECT,
    LOG_SQL
}) => {
    const Op = Sequelize.Op;
    const options = {
        host: HOST,
        dialect: DATABASE_DIALECT,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        }
    };

    if(!LOG_SQL) options.logging = false;

    const sequelize = new Sequelize(Object.assign({}, options, {
        database: DATABASE_NAME
    }));
    const rootPath = require('path').normalize(__dirname + '/../..');

    return createDatabaseIfNotExists(options, DATABASE_NAME)
        .then(() => glob.sync(rootPath + '/server/models/*.js').map(
            controllerPath => require(controllerPath)(sequelize, Sequelize.DataTypes)
        ))
        .then(Models => Promise.all(Models.map(Model => Model.sync())))
        .then(() => loadDefaultDatabaseSettings(sequelize))
        .then(() => sequelize);
};