const configSequelize = require('./server/config/configSequelize');
const serverSettings = require('./server/serverSettings');
const addGlobalHelpers = require('./server/config/addGlobalHelpers');
const {removeDatabase} = require('./server/services/database/databaseUtils');
const dummyDatabase = require('./server/services/database/dummyDatabase');
const passwordHash = require('password-hash');
const mysqldump = require('mysqldump');
const readline = require('readline');
const {roles} = require('./services/constants');
const log = require('./server/services/log');
addGlobalHelpers();

const argument = process.argv[2];
const arguments = {
    defaultDatabase: 'defaultDatabase',
    removeDatabase: 'removeDatabase',
    dummyDatabase: 'dummyDatabase',
    createAdmin: 'createAdmin',
    hashPassword: 'hashPassword',
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

const promiseQuestion = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer))
    });
};

const createAdminUser = (sequelize) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const user = {
        username: '',
        walletAddress: '',
        email: '',
        role: roles.admin,
        rating: 0
    };

    log.sectionTitle('Create Admin');

    return promiseQuestion(rl, 'Username?\n')
        .then(username => {
            user.username = username;
            return promiseQuestion(rl, 'Password?\n');
        })
        .then(password => {
            user.password = password;
            return promiseQuestion(rl, 'Wallet Address?\n');
        })
        .then(walletAddress => {
            user.walletAddress = walletAddress;
            return promiseQuestion(rl, 'Email?\n')
        })
        .then(email => {
            user.email = email;
            rl.close();
            return sequelize.models.users.create(user);
        })
        .then(() => log.endOfSection());
};

if(argument.includes('Database') || argument.includes('createAdmin')){
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
        mysqldump({
            connection: {
                host: serverSettings.DATABASE_DUMP_HOST,
                port: serverSettings.DATABASE_PORT,
                user: serverSettings.DATABASE_USER,
                password: serverSettings.DATABASE_PASSWORD,
                database: serverSettings.DATABASE_NAME
            },
            dumpToFile: `./${serverSettings.DATABASE_DUMP_FILE}`
        });
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