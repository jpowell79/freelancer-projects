const settings = require('../../site-settings');
const SnapshotService = require('../services/SnapshotService/index');
const DummyDatabase = require('../services/DummyDatabase/index');
const HistoricDataArchvier = require('../services/HistoricDataArchiver/index');
const log = require('../services/utils/log');
const DatabaseCleaner = require('../services/databaseHelpers/DatabaseCleaner');
const moment = require('moment');
moment.locale('en');

async function removeDatabase() {
    if(settings.REMOVE_DATABASE){
        return DatabaseCleaner.cleanDatabase();
    }
}

async function enableSnaphotService(){
    if(settings.ENABLE_SNAPSHOT_SERVICE){
        log.sectionTitle('Starting SnapshotService');

        let snapshotService = new SnapshotService();

        return snapshotService.launch({
                onSnapshotSaved: (contract) => {
                    console.log(
                        `SnapshotService: Historic data for contract ` +
                        `${contract.contractAddress} saved.`
                    );
                }
            })
            .then(response => {
                let refreshRate = settings.SNAPSHOT_SERVICE_REFRESH_RATE;

                console.log(
                    `SnapshotService is now up and running ` +
                    `(it will relaunch every ${refreshRate/(1000*60)} minutes)`
                );

                if(snapshotService.extendedTimeWatcher.objectsToWatch.length > 0){
                    console.log('SnapshotService is now waiting for the following contracts:');
                    console.log(response.log);
                } else {
                    console.log(
                        'SnapshotService found no times to wait for.\n'+
                        'See the following data for reference:'
                    );
                    console.log(response.log);
                }

                setInterval(() => {
                    console.log('SnapshotService: Relaunching...');
                    snapshotService.reLaunch();
                }, refreshRate);

                log.endOfSection();
            });
    }
}

async function loadDummyDatabase(){
    if(settings.LOAD_DUMMY_DATABASE){
        return DummyDatabase.create();
    }
}

async function archiveHistoricData(){
    if(settings.ENABLE_ARCHIVE_OLD_DATA){
        let days = settings.ARCHIVE_DATA_OLDER_THAN.days;
        log.sectionTitle(`Archiving data older than ${days} days`);
        return HistoricDataArchvier.archiveDataOlderThan(days)
            .then(response => {
                console.log(`Archived ${response.length} entries`);
                log.endOfSection();
                return "OK";
            });
    }
}

module.exports.load = async function load(){
    return removeDatabase().then(() => {
            return loadDummyDatabase();
        }).then(() => {
            return enableSnaphotService();
        }).then(() => {
            return archiveHistoricData();
        });
};