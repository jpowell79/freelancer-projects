const objects = require("../../services/datatypes/objects");
const {roles, regex} = require("../../services/constants");
const passwordHash = require("password-hash");

module.exports = (sequelize, DataTypes) => (
    sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                is: regex.username,
                len: [2, 64]
            }
        },
        walletAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: regex.walletAddress,
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