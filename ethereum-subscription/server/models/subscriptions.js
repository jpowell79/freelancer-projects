module.exports = (sequelize, DataTypes) => (
    sequelize.define("subscriptions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contractId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "subscriptionContracts",
                key: "id"
            }
        },
        subscriberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "subscribers",
                key: "id"
            }
        },
        transactionHash: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /0x[a-zA-Z0-9]+/g
            }
        }
    })
);