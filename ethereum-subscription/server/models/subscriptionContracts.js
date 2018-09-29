module.exports = (sequelize, DataTypes) => (
    sequelize.define("subscriptionContracts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /0x[a-zA-Z0-9]+/g,
                len: [42, 42]
            }
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0, 2048]
            }
        },
        ownerUsername: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g,
                len: [2, 64]
            },
            references: {
                model: "users",
                key: "username"
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        hasFreeTrials: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "subscriptionTypes",
                key: "id"
            }
        },
    })
);