const objects = require("../../services/datatypes/objects");
const {roles, regex} = require("../../services/constants");
const passwordHash = require("password-hash");
const {DataTypes} = require("sequelize");

const model = {
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
        unique: true,
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
    }
};

module.exports = {
    model,
    defineModel: (sequelize) => sequelize.define("users", model, {
        hooks: {
            beforeCreate: (user) => {
                user.password = passwordHash.generate(user.password);
            }
        }
    })
};