require('../services/utils/padEnd');
const settings = require('../../site-settings');
const SnapshotService = require('../services/SnapshotService/index');
const DummyDatabase = require('../services/DummyDatabase/index');
const HistoricDataArchiverService = require('../services/HistoricDataArchiver/Service');
const log = require('../services/utils/log');
const DatabaseCleaner = require('../services/databaseHelpers/DatabaseCleaner');
const moment = require('moment');
const CryptoDataService = require('../services/CryptoDataService');
const os = require('os');
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
                    snapshotService.reLaunch().catch(err => {
                        console.error(err);
                    });
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
    if(settings.ENABLE_ARCHIVER_SERVICE){
        let hours = settings.ARCHIVER_REFRESH_RATE/(1000*60*60);

        log.sectionTitle('Starting HistoricDataArchiverService');
        new HistoricDataArchiverService();
        console.log(`Service started. It will update every ${hours} hours`);
        log.endOfSection();
    }
}

async function enableCryptoDataService(){
    if(settings.ENABLE_CRYPTO_DATA_SERVICE){
        log.sectionTitle('Starting CryptoDataService');
        return new CryptoDataService().launch()
            .then(() => {
                console.log(
                    `Service started. It will update every ` +
                    `${settings.CRYPTO_DATA_SERVICE_REFRESH_RATE/1000} seconds`
                );
                log.endOfSection();
            });
    }
}

module.exports.getProxy = () => {
    const ethernet = os.networkInterfaces().Ethernet;

    if(!ethernet) return null;

    const proxy = ethernet
        .filter(ip => ip.family === 'IPv4')
        .map(ip => ip.address)[0];

    return (proxy) ? proxy : null;
};

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