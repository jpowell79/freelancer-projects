const defaultData = require('../../services/defaultData');

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
        sequelize.models.subscription_types.create(type)
    ));
};

module.exports.loadDefaultSubscriptionContracts = async (sequelize) => {
    return Promise.all(defaultData.subscriptionContracts.map(contract =>
        sequelize.models.subscription_types.findOne({where: {name: contract.subscriptionTypeId}})
            .then(typeEntry => typeEntry.dataValues)
            .then(type => sequelize.models.subscription_contracts
                .create(Object.assign({}, contract, {subscriptionTypeId: type.id})))
    ));
};

module.exports.loadDefaultSubscribers = async (sequelize) => {
    return Promise.all(defaultData.subscribers.map(subscriber =>
        sequelize.models.subscribers.create(subscriber)
    ));
};

module.exports.loadDefaultSubscription = async (sequelize) => {
    let subscriptionContract;

    return Promise.all(defaultData.subscriptions.map(subscription =>
        sequelize.models.subscription_contracts
            .findOne({
                where: {
                    address: subscription.subscriptionContractAddress
                }
            })
            .then(contractEntry => contractEntry.dataValues)
            .then(contract => {subscriptionContract = contract;})
            .then(() => sequelize.models.subscribers
                .findOne({
                    where: {
                        walletAddress: subscription.subscriberWalletAddress
                    }
                })
            )
            .then(subscriberEntry => subscriberEntry.dataValues)
            .then(subscriber => sequelize.models.subscriptions
                .create({
                    subscriberId: subscriber.id,
                    subscriptionContractId: subscriptionContract.id
                })
            )
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