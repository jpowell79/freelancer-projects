const objects = require('../../services/datatypes/objects');
const roles = require('../../services/constants/roles');
const passwordHash = require('password-hash');

module.exports = (sequelize, DataTypes) => (
    sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g,
                len: [2, 64]
            }
        },
        walletAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /0x[a-zA-Z0-9]+/g,
                len: [42, 42]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [objects.values(roles)]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
    },
    {
        hooks: {
            beforeCreate: (user) => {
                user.password = passwordHash.generate(user.password);
            }
        }
    })
);