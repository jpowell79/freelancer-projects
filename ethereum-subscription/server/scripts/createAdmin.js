const serverSettings = require("../serverSettings");
const configSequelize = require("../config/configSequelize");
const {roles} = require("../../services/constants/index");
const readline = require("readline");
const log = require("../services/log");

const promiseQuestion = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer))
    });
};

module.exports = async () => {
    return configSequelize(serverSettings, false)
        .then(sequelize => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const user = {
                username: "",
                walletAddress: "",
                email: "",
                role: roles.admin,
                rating: 0
            };

            log.sectionTitle("Create Admin");

            return promiseQuestion(rl, "Username?\n")
                .then(username => {
                    user.username = username;
                    return promiseQuestion(rl, "Password?\n");
                })
                .then(password => {
                    user.password = password;
                    return promiseQuestion(rl, "Wallet Address?\n");
                })
                .then(walletAddress => {
                    user.walletAddress = walletAddress;
                    return promiseQuestion(rl, "Email?\n")
                })
                .then(email => {
                    user.email = email;
                    rl.close();
                    return sequelize.models.users.create(user);
                })
                .then(() => log.endOfSection());
        });
};