const configSequelize = require('./server/config/configSequelize');
const serverSettings = require('./server/serverSettings');
const addGlobalHelpers = require('./server/config/addGlobalHelpers');
const {removeDatabase} = require('./server/services/database/databaseUtils');
const dummyDatabase = require('./server/services/database/dummyDatabase');
const passwordHash = require('password-hash');
addGlobalHelpers();

const arguments = {
    defaultDatabase: 'defaultDatabase',
    removeDatabase: 'removeDatabase',
    dummyDatabase: 'dummyDatabase',
    hashPassword: 'hashPassword'
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

if(process.argv[2].includes('Database')){
    configSequelize(serverSettings, false)
        .then(sequelize => {
            switch (process.argv[2]) {
            case arguments.removeDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME);
            case arguments.defaultDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME)
                    .then(() => configSequelize(serverSettings));
            case arguments.dummyDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME)
                    .then(() => configSequelize(serverSettings, false))
                    .then(seq => dummyDatabase.load(seq));
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
} else {
    switch (process.argv[2]) {
    case arguments.hashPassword:
        console.log(passwordHash.generate(process.argv[3]));
        break;
    case 'help':
        printHelp();
        break;
    default:
        console.error(`Error: Unexpected argument ${process.argv[2]}`);
        printHelp();
        process.exit(1);
        break;
    }
}