require('../services/utils/padEnd');
const databaseSettings = require('../../site-settings');
const SnapshotService = require('../services/SnapshotService/index');
const DummyDatabase = require('../services/DummyDatabase/index');
const HistoricDataArchiverService = require('../services/HistoricDataArchiver/Service');
const log = require('../services/utils/log');
const DatabaseCleaner = require('../services/databaseHelpers/DatabaseCleaner');
const moment = require('moment');
const CryptoDataService = require('../services/CryptoDataService');
moment.locale('en');

async function removeDatabase() {
    if(databaseSettings.REMOVE_DATABASE){
        return DatabaseCleaner.cleanDatabase();
    }
}

async function enableSnaphotService(){
    if(databaseSettings.ENABLE_SNAPSHOT_SERVICE){
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
                let refreshRate = databaseSettings.SNAPSHOT_SERVICE_REFRESH_RATE;

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
                    snapshotService.reLaunch().catch(err => {
                        console.error(err);
                    });
                }, refreshRate);

                log.endOfSection();
            });
    }
}

async function loadDummyDatabase(){
    if(databaseSettings.LOAD_DUMMY_DATABASE){
        return DummyDatabase.create();
    }
}

async function archiveHistoricData(){
    if(databaseSettings.ENABLE_ARCHIVER_SERVICE){
        let hours = databaseSettings.ARCHIVER_REFRESH_RATE/(1000*60*60);

        log.sectionTitle('Starting HistoricDataArchiverService');
        new HistoricDataArchiverService();
        console.log(`Service started. It will update every ${hours} hours`);
        log.endOfSection();
    }
}

async function enableCryptoDataService(){
    if(databaseSettings.ENABLE_CRYPTO_DATA_SERVICE){
        log.sectionTitle('Starting CryptoDataService');
        return new CryptoDataService().launch()
            .then(() => {
                console.log(
                    `Service started. It will update every ` +
                    `${databaseSettings.CRYPTO_DATA_SERVICE_REFRESH_RATE/1000} seconds`
                );
                log.endOfSection();
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
        }).then(() => {
            return enableCryptoDataService();
        }).catch(err => {
            console.error(err);
            process.exit(1);
        });
};