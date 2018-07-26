const mocks = require('./mocks');

module.exports = (sequelize) => {
    return sequelize.query(`DELETE FROM users`)
        .then(() => sequelize.models.users.create(mocks.user));
};