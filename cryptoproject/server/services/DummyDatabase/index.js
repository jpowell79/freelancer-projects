const HistoricDataHelper = require('../../services/databaseHelpers/HistoricDataHelper');
const ArchivedHistoricDataHelper = require('../../services/databaseHelpers/ArchivedHistoricDataHelper');
const log = require('../utils/log');
const dummyData = require('./dummyData');
const settings = require('../../../site-settings');

function create(){
    log.sectionTitle("Loading Dummy database");
    console.log('Removing historic data...');

    return HistoricDataHelper.removeAll()
        .then(() => {
            console.log('Historic data removed.');
            console.log('Loading dummy historic data...');

            return Promise.all(
                dummyData.getDummyHistoricData(
                    settings.DUMMY_HISTORIC_DATA_TO_GENERATE
                ).map(data =>
                    HistoricDataHelper.create(data)
                ));
        })
        .then(() => {
            console.log('Dummy historic data loaded.');
            console.log('Removing archived historic data...');
            return ArchivedHistoricDataHelper.removeAll();
        })
        .then(() => {
            console.log('Archived historic data removed.');
            console.log('Loading dummy archived historic data...');

            return Promise.all(
                dummyData.getDummyArchivedHistoricData(
                    settings.DUMMY_ARCHIVED_HISTORIC_DATA_TO_GENERATE
                ).map(contract =>
                    ArchivedHistoricDataHelper.create(contract)
                ));
        })
        .then(() => {
            console.log('Dummy database loaded.');
            log.endOfSection();

            return "OK";
        });
}

module.exports = {
    create
};