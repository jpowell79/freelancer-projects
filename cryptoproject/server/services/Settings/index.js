const settings = require('../../../site-settings');
const SnapshotService = require('../../services/SnapshotService/');
const DummyDatabase = require('../DummyDatabase');
const HistoricDataArchvier = require('../HistoricDataArchiver');
const log = require('../utils/log');
const DatabaseCleaner = require('../databaseHelpers/DatabaseCleaner');

async function removeDatabase() {
    if(settings.REMOVE_DATABASE){
        return DatabaseCleaner.cleanDatabase();
    }
}

async function enableSnaphotService(){
    if(settings.ENABLE_SNAPSHOT_SERVICE){
        log.sectionTitle('Starting SnapshotService');

        let snapshotService = new SnapshotService({
            onSnapshotSaved: (contract) => {
                console.log(`SnapshotService: Historic data for contract ${contract.contractAddress} saved.`);
            }
        });

        return snapshotService.launch()
            .then(response => {
                let refreshRate = settings.SNAPSHOT_SERVICE_REFRESH_RATE;

                console.log(
                    `SnapshotService is now up and running ` +
                    `(it will relaunch every ${refreshRate/(1000*60)} minutes)`
                );

                if(response.watcher.objectsToWatch.length > 0){
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