const dummyData = require("./dummyData");
const Subscriptions = require("../api/Subscriptions");

module.exports.loadDummySettings = async (sequelize) => {
    return Promise.all(Object.keys(dummyData.settings)
        .map(key => {
            return sequelize.models.settings.create({
                name: key,
                value: dummyData.settings[key]
            });
        })
    );
};

module.exports.loadDummyUsers = async (sequelize) => {
    return Promise.all(dummyData.users.map(user =>
        sequelize.models.users.create(user)
    ));
};

module.exports.loadDummySubscriptionTypes = async (sequelize) => {
    return Promise.all(dummyData.subscriptionTypes.map(type =>
        sequelize.models.subscriptionTypes.create(type)
    ));
};

module.exports.loadDummySubscriptionContracts = async (sequelize) => {
    return Promise.all(dummyData.subscriptionContracts.map(contract =>
        sequelize.models.subscriptionTypes.findOne({where: {name: contract.typeName}})
            .then(typeEntry => typeEntry.dataValues)
            .then(type => sequelize.models.subscriptionContracts
                .create(Object.assign({}, contract, {typeId: type.id})))
    ));
};

module.exports.loadDummySubscribers = async (sequelize) => {
    return Promise.all(dummyData.subscribers.map(subscriber =>
        sequelize.models.subscribers.create(subscriber)
    ));
};

module.exports.loadDummySubscription = async (sequelize) => {
    const subscriptions = new Subscriptions({sequelize});

    return Promise.all(dummyData.subscriptions.map(subscription =>
        subscriptions.create(subscription)
    ));
};

module.exports.load = async (sequelize) => {
    return module.exports.loadDummySettings(sequelize)
        .then(() => module.exports.loadDummyUsers(sequelize))
        .then(() => module.exports.loadDummySubscriptionTypes(sequelize))
        .then(() => module.exports.loadDummySubscriptionContracts(sequelize))
        .then(() => module.exports.loadDummySubscribers(sequelize))
        .then(() => module.exports.loadDummySubscription(sequelize));
};