const removeDatabase = (sequelize, databaseName) => {
    return sequelize.query(`DROP DATABASE ${databaseName}`);
};

module.exports = {
    removeDatabase
};