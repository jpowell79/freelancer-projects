const Sequelize = require("sequelize");
const defaultDatabase = require("../services/database/defaultDatabase");

function createDatabaseIfNotExists(sequelizeOptions, dbName){
    const sequelize = new Sequelize(sequelizeOptions);

    return sequelize
        .query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
        .then(res => {
            global.CREATED_DATABASE = res[0].affectedRows === 1
        })
        .then(() => sequelize.close());
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
        },
        define: {
            defaultScope: {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }
        }
    };

    if(global.isProduction()) options.logging = false;

    const sequelize = new Sequelize(Object.assign({}, options, {
        database: DATABASE_NAME
    }));

    const Settings = require("../models/settings")(sequelize, Sequelize.DataTypes);
    const Subscribers = require("../models/subscribers")(sequelize, Sequelize.DataTypes);
    const SubscriptionTypes = require("../models/subscriptionTypes")(sequelize, Sequelize.DataTypes);
    const Subscriptions = require("../models/subscriptions")(sequelize, Sequelize.DataTypes);
    const SubscriptionContracts = require("../models/subscriptionContracts")(sequelize, Sequelize.DataTypes);
    const Users = require("../models/users")(sequelize, Sequelize.DataTypes);

    Users.hasMany(SubscriptionContracts, {
        foreignKey: "ownerUsername"
    });
    SubscriptionContracts.belongsTo(SubscriptionTypes, {
        foreignKey: "typeId"
    });
    SubscriptionTypes.hasMany(SubscriptionContracts, {
        foreignKey: "typeId"
    });
    SubscriptionContracts.belongsToMany(Subscribers, {
        through: Subscriptions,
        foreignKey: "contractId"
    });
    Subscribers.belongsToMany(SubscriptionContracts, {
        through: Subscriptions,
        foreignKey: "subscriberId"
    });

    return createDatabaseIfNotExists(options, DATABASE_NAME)
        .then(() => Settings.sync())
        .then(() => Users.sync())
        .then(() => SubscriptionTypes.sync())
        .then(() => SubscriptionContracts.sync())
        .then(() => Subscribers.sync())
        .then(() => Subscriptions.sync())
        .then(() => {
            if(loadDefaultData && global.CREATED_DATABASE){
                return defaultDatabase.load(sequelize);
            }
        })
        .then(() => sequelize);
};