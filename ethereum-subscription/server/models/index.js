class Models {
    constructor(sequelize){
        this.Settings = require("./settings")(sequelize);
        this.Subscribers = require("./subscribers")(sequelize);
        this.SubscriptionTypes = require("./subscriptionTypes")(sequelize);
        this.Subscriptions = require("./subscriptions")(sequelize);
        this.SubscriptionContracts = require("./subscriptionContracts")(sequelize);
        this.Users = require("./users").defineModel(sequelize);
        this.SuspendedUsers = require("./suspendedUsers")(sequelize);
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
            .then(() => this.SuspendedUsers.sync())
    }
}

module.exports = Models;