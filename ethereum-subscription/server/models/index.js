const Sequelize = require("sequelize");

class Models {
    constructor(sequelize){
        this.Settings = require("../models/settings")(sequelize, Sequelize.DataTypes);
        this.Subscribers = require("../models/subscribers")(sequelize, Sequelize.DataTypes);
        this.SubscriptionTypes = require("../models/subscriptionTypes")(sequelize, Sequelize.DataTypes);
        this.Subscriptions = require("../models/subscriptions")(sequelize, Sequelize.DataTypes);
        this.SubscriptionContracts = require("../models/subscriptionContracts")(sequelize, Sequelize.DataTypes);
        this.Users = require("../models/users")(sequelize, Sequelize.DataTypes);
    }

    defineRelations(){
        this.Users.hasMany(this.SubscriptionContracts, {
            foreignKey: "ownerUsername"
        });
        this.SubscriptionContracts.belongsTo(this.SubscriptionTypes, {
            foreignKey: "typeId"
        });
        this.SubscriptionTypes.hasMany(this.SubscriptionContracts, {
            foreignKey: "typeId"
        });
        this.SubscriptionContracts.belongsToMany(this.Subscribers, {
            through: this.Subscriptions,
            foreignKey: "contractId"
        });
        this.Subscribers.belongsToMany(this.SubscriptionContracts, {
            through: this.Subscriptions,
            foreignKey: "subscriberId"
        });

        return this;
    }

    async sync(){
        return this.Settings.sync()
            .then(() => this.Users.sync())
            .then(() => this.SubscriptionTypes.sync())
            .then(() => this.SubscriptionContracts.sync())
            .then(() => this.Subscribers.sync())
            .then(() => this.Subscriptions.sync())
    }
}

module.exports = Models;