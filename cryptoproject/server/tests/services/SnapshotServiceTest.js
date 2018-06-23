const SnapshotService = require('../../services/SnapshotService/');

let snapshotService = new SnapshotService({
    onSnapshotSaved: (contract) => {
        console.log(`Historic data for contract ${contract.contractAddress} saved.`);
    }
});

console.log('Testing to launch the snapshot service...');
snapshotService.launch().then(response => {
    if(response.watcher.objectsToWatch.length > 0){
        console.log('SnapshotService is waiting for the following contracts:\n');
        console.log(response.log);
    } else {
        console.log('SnapshotService found no times to wait for. See the following data for reference:\n');
        console.log(response.log);
    }
});

console.log('Testing relaunch...');
snapshotService.reLaunch().then(() => {
    console.log('SnapshotService relaunched successfully!');
});

