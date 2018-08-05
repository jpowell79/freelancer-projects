const configSequelize = require('./server/config/configSequelize');
const serverSettings = require('./server/serverSettings');
const defaultDatabase = require('./server/services/defaultDatabase');
const addGlobalHelpers = require('./server/config/addGlobalHelpers');
addGlobalHelpers();

const arguments = {
    defaultDatabase: 'defaultDatabase',
    removeDatabase: 'removeDatabase'
};

const printHelp = () => {
    let options = '';

    Object.keys(arguments).forEach((arg, i) => {
        options += arg;

        if (i !== Object.keys(arguments).length - 1) {
            options += '|';
        }
    });

    console.log(`Usage: node scripts.js [${options}]`);
    process.exit(0);
};

if (process.argv.length < 3) {
    printHelp();
}

function removeDatabase(sequelize) {
    return sequelize.query(`DROP TABLE settings`)
        .then(() => sequelize.query(`DROP TABLE subscriptions`))
        .then(() => sequelize.query(`DROP TABLE subscribers`))
        .then(() => sequelize.query(`DROP TABLE subscription_contracts`))
        .then(() => sequelize.query(`DROP TABLE subscription_types`))
        .then(() => sequelize.query(`DROP TABLE users`));
}

function loadDefaultDatabase(sequelize) {
    return removeDatabase(sequelize)
        .then(() => configSequelize(serverSettings, false))
        .then(() => defaultDatabase.load(sequelize));
}

configSequelize(serverSettings, false)
    .then(sequelize => {
        switch (process.argv[2]) {
        case arguments.removeDatabase:
            return removeDatabase(sequelize);
        case arguments.defaultDatabase:
            return loadDefaultDatabase(sequelize);
        case 'help':
            printHelp();
            break;
        default:
            console.error(`Error: Unexpected argument ${process.argv[2]}`);
            printHelp();
            process.exit(1);
            break;
        }
    })
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });