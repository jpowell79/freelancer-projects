const mongoose = require('mongoose');
const siteSettings = require('./site-settings');
const log = require('./server/services/utils/log');
const DatabaseCleaner = require('./server/services/databaseHelpers/DatabaseCleaner');
const DummyDatabase = require('./server/services/DummyDatabase/index');
const HistoricDataArchiver = require('./server/services/HistoricDataArchiver/index');

const MONGODB_URI = process.env.MONGODB_URI || siteSettings.MONGODB_URI;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

const arguments = {
    removeDatabase: 'removeDatabase',
    dummyDatabase: 'dummyDatabase',
    archive: 'archive'
};

const printHelp = () => {
    let options = '';

    Object.keys(arguments).forEach((arg, i) => {
        options += arg;

        if(i !== Object.keys(arguments).length-1){
            options += '|';
        }
    });

    console.log(`Usage: node scripts.js [${options}]`);
    process.exit(0);
};

if(process.argv.length < 3){
    printHelp();
}

switch (process.argv[2]){
case arguments.removeDatabase:
    DatabaseCleaner.cleanDatabase().then(() => {
        process.exit(0);
    });
    break;
case arguments.dummyDatabase:
    DummyDatabase.create().then(() => {
        process.exit(0);
    });
    break;
case arguments.archive:
    let days = siteSettings.ARCHIVE_DATA_OLDER_THAN.days;
    log.sectionTitle(`Archiving data older than ${days} days`);
    HistoricDataArchiver.archiveDataOlderThan(days).then(response => {
        console.log(`Archived ${response.length} entries`);
        log.endOfSection();
        process.exit(0);
    });
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