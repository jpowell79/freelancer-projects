const SnapshotDaemon = require('../../services/SnapshotService/');

let launchCounter = 0;

console.log('Testing to launch the snapshot service...');
let snapshotDaemon = new SnapshotDaemon({
    onLaunch: (log, watcher) => {
        if(launchCounter === 0){
            if(watcher.timesToWatch.length > 0){
                console.log('SnapshotService is waiting for the following contracts:\n');
            } else {
                console.log('SnapshotService found no times to wait for. See the following table for reference:\n');
            }

            console.log(log);
            launchCounter++;
        } else {
            console.log('SnapshotService reLaunched successfully!');
        }
    },
    onSnapshotSaved: (contract) => {
        console.log(`Historic data for contract ${contract.contract_address} saved.`);
    }
});

console.log('Testing relaunch...');
snapshotDaemon.reLaunch();