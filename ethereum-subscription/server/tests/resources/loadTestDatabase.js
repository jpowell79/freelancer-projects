const mocks = require("./mocks");
const SubscriptionContracts = require("../../services/api/SubscriptionContracts");
const Subscriptions = require("../../services/api/Subscriptions");

module.exports = (sequelize) => {
    const subscriptionContracts = new SubscriptionContracts({sequelize});
    const subscriptions = new Subscriptions({sequelize});

    return sequelize.query(`DELETE FROM settings`)
        .then(() => sequelize.query(`DELETE FROM subscriptions`))
        .then(() => sequelize.query(`DELETE FROM subscriptionContracts`))
        .then(() => sequelize.query(`DELETE FROM subscribers`))
        .then(() => sequelize.query(`DELETE FROM subscriptionTypes`))
        .then(() => sequelize.query(`DELETE FROM users`))
        .then(() => sequelize.models.users.create(mocks.user))
        .then(() => sequelize.models.users.create(mocks.admin))
        .then(() => sequelize.models.settings.create(mocks.setting))
        .then(() => sequelize.models.subscriptionTypes.create(mocks.subscriptionType))
        .then(() => sequelize.models.subscribers.create(mocks.subscriber))
        .then(() => subscriptionContracts.create(mocks.subscriptionContract))
        .then(() => subscriptions.create(mocks.subscription));
};