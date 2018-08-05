const Sequelize = require('sequelize');
const defaultDatabase = require('../services/defaultDatabase');

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

function loadDefaultDatabaseUsers(sequelize){
    return sequelize.models.users
        .findAll()
        .then(users => {
            if(users.length === 0){
                return defaultDatabase.loadDefaultUsers(sequelize);
            }
        });
}

module.exports = async ({
    HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_DIALECT
}, loadDefaultData = true) => {
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

    if(global.isProduction()) options.logging = false;

    const sequelize = new Sequelize(Object.assign({}, options, {
        database: DATABASE_NAME
    }));

    const Settings = require('../models/settings')(sequelize, Sequelize.DataTypes);
    const Subscribers = require('../models/subscribers')(sequelize, Sequelize.DataTypes);
    const SubscriptionTypes = require('../models/subscription_types')(sequelize, Sequelize.DataTypes);
    const Subscriptions = require('../models/subscriptions')(sequelize, Sequelize.DataTypes);
    const SubscriptionContracts = require('../models/subscription_contracts')(sequelize, Sequelize.DataTypes);
    const Users = require('../models/users')(sequelize, Sequelize.DataTypes);

    Users.hasMany(SubscriptionContracts);
    SubscriptionTypes.hasOne(SubscriptionContracts);
    SubscriptionContracts.hasMany(Subscriptions);
    Subscribers.hasMany(Subscriptions);

    return createDatabaseIfNotExists(options, DATABASE_NAME)
        .then(() => Settings.sync())
        .then(() => Users.sync())
        .then(() => SubscriptionTypes.sync())
        .then(() => SubscriptionContracts.sync())
        .then(() => Subscribers.sync())
        .then(() => Subscriptions.sync())
        .then(() => {
            if(loadDefaultData){
                return loadDefaultDatabaseSettings(sequelize);
            }
        })
        .then(() => {
            if(global.isDevelopment() && loadDefaultData)
                return loadDefaultDatabaseUsers(sequelize);
        })
        .then(() => sequelize);
};