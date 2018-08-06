module.exports = (sequelize, DataTypes) => (
    sequelize.define('subscriptions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        contractId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'subscriptionContracts',
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