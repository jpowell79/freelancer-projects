const mocks = require('./mocks');

module.exports = (sequelize) => {
    return sequelize.query(`DELETE FROM users`)
        .then(() => sequelize.query(`DELETE FROM settings`))
        .then(() => sequelize.models.users.create(mocks.user))
        .then(() => sequelize.models.users.create(mocks.admin))
        .then(() => sequelize.models.settings.create(mocks.setting));
};