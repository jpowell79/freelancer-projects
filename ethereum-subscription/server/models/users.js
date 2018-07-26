const objects = require('../../services/objects');
const roles = require('../../services/roles');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g,
                len: [2, 64]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: objects.values(roles)
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
};