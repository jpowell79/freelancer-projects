require('./server/config/defineGlobals');
const configSequelize = require('./server/config/configSequelize');
const serverSettings = require('./server/serverSettings');
const {removeDatabase} = require('./server/services/database/databaseUtils');
const dummyDatabase = require('./server/services/database/dummyDatabase');
const passwordHash = require('password-hash');
const createAdminUser = require("./server/scripts/createAdminUser");
const dumpDatabase = require("./server/scripts/dumpDatabase");
const updateFaviconComponent = require("./server/scripts/updateFaviconComponent");
global.PROJECT_ROOT = __dirname;

const argument = process.argv[2];
const arguments = {
    defaultDatabase: 'defaultDatabase',
    removeDatabase: 'removeDatabase',
    dummyDatabase: 'dummyDatabase',
    createAdmin: 'createAdmin',
    hashPassword: 'hashPassword',
    favicon: 'favicon',
    dump: 'dump'
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

const isDatabaseArgument = argument.includes('Database') || argument.includes('createAdmin');

if(isDatabaseArgument){
    configSequelize(serverSettings, false)
        .then(sequelize => {
            switch (argument) {
            case arguments.removeDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME);
            case arguments.defaultDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME)
                    .then(() => configSequelize(serverSettings));
            case arguments.dummyDatabase:
                return removeDatabase(sequelize, serverSettings.DATABASE_NAME)
                    .then(() => configSequelize(serverSettings, false))
                    .then(seq => dummyDatabase.load(seq));
            case arguments.createAdmin:
                return createAdminUser(sequelize);
            case 'help':
                printHelp();
                break;
            default:
                console.error(`Error: Unexpected argument ${argument}`);
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
    switch (argument) {
    case arguments.hashPassword:
        console.log(passwordHash.generate(process.argv[3]));
        break;
    case arguments.dump:
        dumpDatabase(`./${serverSettings.DATABASE_DUMP_FILE}`);
        break;
    case arguments.favicon:
        updateFaviconComponent();
        break;
    case 'help':
        printHelp();
        break;
    default:
        console.error(`Error: Unexpected argument ${argument}`);
        printHelp();
        process.exit(1);
        break;
    }
}