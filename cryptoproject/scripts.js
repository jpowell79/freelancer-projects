const mongoose = require('mongoose');
const siteSettings = require('./site-settings');
const log = require('./server/services/utils/log');
const DatabaseCleaner = require('./server/services/databaseHelpers/DatabaseCleaner');
const DummyDatabase = require('./server/services/DummyDatabase/index');
const HistoricDataArchiver = require('./server/services/HistoricDataArchiver/index');

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/database`;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

switch (process.argv[2]){
case "removeDatabase":
    DatabaseCleaner.cleanDatabase().then(() => {
        process.exit(0);
    });
    break;
case "dummyDatabase":
    DummyDatabase.create().then(() => {
        process.exit(0);
    });
    break;
case "archive":
    let days = siteSettings.ARCHIVE_DATA_OLDER_THAN.days;
    log.sectionTitle(`Archiving data older than ${days} days`);
    HistoricDataArchiver.archiveDataOlderThan(days).then(response => {
        console.log(`Archived ${response.length} entries`);
        log.endOfSection();
        process.exit(0);
    });
    break;
default:
    console.error(`Unexpected argument ${process.argv[2]}`);
    process.exit(1);
    break;
}