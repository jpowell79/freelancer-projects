module.exports = (sequelize, DataTypes) => (
    sequelize.define('subscriptions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subscriptionContractId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subscription_contracts',
                key: 'id'
            }
        },
        subscriberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subscribers',
                key: 'id'
            }
        },
    })
);