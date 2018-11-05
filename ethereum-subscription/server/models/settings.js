const {DataTypes} = require("sequelize");

module.exports = (sequelize) => (
    sequelize.define("settings", {
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