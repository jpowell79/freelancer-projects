const {DataTypes} = require("sequelize");

module.exports = (sequelize) => (
    sequelize.define("subscriptionTypes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [0, 64]
            }
        },
    })
);