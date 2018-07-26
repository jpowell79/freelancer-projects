module.exports = (sequelize, DataTypes) => (
    sequelize.define('settings', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
);