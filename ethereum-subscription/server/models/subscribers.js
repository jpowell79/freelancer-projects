module.exports = (sequelize, DataTypes) => (
    sequelize.define("subscribers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        walletAddress: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
            validate: {
                is: /0x[a-zA-Z0-9]+/g,
                len: [42, 42]
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    })
);