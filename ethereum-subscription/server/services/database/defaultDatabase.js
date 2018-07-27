const defaultData = require('./defaultData');

module.exports.loadDefaultSettings = (sequelize) => {
    return Promise.all(Object.keys(defaultData.settings)
        .map(key => {
            return sequelize.models.settings.create({
                name: key,
                value: defaultData.settings[key]
            });
        })
    );
};