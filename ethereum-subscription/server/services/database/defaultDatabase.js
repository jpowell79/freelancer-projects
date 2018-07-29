const defaultData = require('./defaultData');

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

module.exports.load = async (sequelize) => {
    return module.exports.loadDefaultSettings(sequelize)
        .then(() => module.exports.loadDefaultUsers(sequelize));
};