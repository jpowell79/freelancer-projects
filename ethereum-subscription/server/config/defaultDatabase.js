const defaultSettingsData = require('../../services/database/defaultSettingsData');

module.exports.loadDefaultSettings = (sequelize) => {
    return Promise.all(Object.keys(defaultSettingsData)
        .map(key => {
            return sequelize.models.settings.create({
                name: key,
                value: defaultSettingsData[key]
            });
        })
    );
};