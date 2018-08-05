const defaultData = require('../../services/defaultData');
const Subscriptions = require('./api/Subscriptions');

module.exports.loadDefaultSettings = async (sequelize) => {
    return Promise.all(Object.keys(defaultData.settings)
        .map(key => {
            return sequelize.models.settings.create({
                name: key,
                value: defaultData.settings[key]
            });
        })
    );
};

module.exports.loadDefaultUsers = async (sequelize) => {
    return Promise.all(defaultData.users.map(user =>
        sequelize.models.users.create(user)
    ));
};

module.exports.loadDefaultSubscriptionTypes = async (sequelize) => {
    return Promise.all(defaultData.subscriptionTypes.map(type =>
        sequelize.models.subscriptionTypes.create(type)
    ));
};

module.exports.loadDefaultSubscriptionContracts = async (sequelize) => {
    return Promise.all(defaultData.subscriptionContracts.map(contract =>
        sequelize.models.subscriptionTypes.findOne({where: {name: contract.typeName}})
            .then(typeEntry => typeEntry.dataValues)
            .then(type => sequelize.models.subscriptionContracts
                .create(Object.assign({}, contract, {typeId: type.id})))
    ));
};

module.exports.loadDefaultSubscribers = async (sequelize) => {
    return Promise.all(defaultData.subscribers.map(subscriber =>
        sequelize.models.subscribers.create(subscriber)
    ));
};

module.exports.loadDefaultSubscription = async (sequelize) => {
    const subscriptions = new Subscriptions({sequelize});

    return Promise.all(defaultData.subscriptions.map(subscription =>
        subscriptions.create(subscription)
    ));
};

module.exports.load = async (sequelize) => {
    return module.exports.loadDefaultSettings(sequelize)
        .then(() => module.exports.loadDefaultUsers(sequelize))
        .then(() => module.exports.loadDefaultSubscriptionTypes(sequelize))
        .then(() => module.exports.loadDefaultSubscriptionContracts(sequelize))
        .then(() => module.exports.loadDefaultSubscribers(sequelize))
        .then(() => module.exports.loadDefaultSubscription(sequelize));
};