const ArchivedHistoricDataHelper = require('./ArchivedHistoricDataHelper');
const HistoricDataHelper = require('./HistoricDataHelper');
const log = require('../utils/log');

function cleanDatabase(){
    log.sectionTitle('Cleaning Database');
    console.log('Removing historic data...');
    return HistoricDataHelper.removeAll()
        .then(() => {
            console.log('Removing archived historic data...');
            return ArchivedHistoricDataHelper.removeAll()
        })
        .then(() => {
            log.endOfSection();
            return "OK";
        });
}

module.exports = {
    cleanDatabase
};