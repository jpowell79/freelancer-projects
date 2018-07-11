'use strict';

require('../utils/padEnd');
const axiosGet = require('axios').get;
const getFinishPriceRetrievalTime = require('../contract').getFinishPriceRetrievalTime;
const fetchAllCryptoContracts = require('../contract').fetchAllCryptoContracts;
const TimeWatcher = require('../TimeWatcher/');
const CoinMarketCapApi = require('../../../services/CoinMarketCapApi/');
const createHistoricData = require('../databaseHelpers/HistoricDataHelper').create;

function SnapshotService(){
    this.onSnapshotSaved = () => {};
    this.onExpiringExtendedTime = () => {};
    this.retrievalTimeWaitInterval = 1000 * 60;

    let onRetrievalTimeExpired = (expiredContract) => {
        let contract = filterExpiredContract(expiredContract);

        if(contract === undefined) return;

        let finishPrice = 0;

        return axiosGet(CoinMarketCapApi.ticker())
            .then(response => {

                return Object.keys(response.data.data)
                    .map(dataKey => response.data.data[dataKey])
                    .filter(data => {
                        return data.name.toLowerCase() === contract.name.toLowerCase()
                    })[0];
            })
            .then(marketData => {
                finishPrice = marketData.quotes.USD.price;

                return createHistoricData(contract, finishPrice);
            }).then(() => {
                this.onSnapshotSaved(contract, finishPrice);
            });
    };

    let onExtendedTimeExpired = (expiredContract) => {
        let contract = filterExpiredContract(expiredContract);

        if(contract === undefined) return;

        getFinishPriceRetrievalTime(contract.index).then(retrievalTime => {
            if(retrievalTime === 0 || isNaN(retrievalTime)){
                let wait = 0;

                let timer = setInterval(async () => {
                    let retrievalTime = await getFinishPriceRetrievalTime(contract.index);
                    wait += 1;

                    if(retrievalTime !== 0){
                        addRetrievalTime({
                            name: contract.name,
                            time: retrievalTime
                        });

                        this.onExpiringExtendedTime(contract);
                        clearInterval(timer);
                    } else if(wait === 10){
                        this.onExpiringExtendedTime(contract);
                        clearInterval(timer);
                    }
                }, this.retrievalTimeWaitInterval);
            } else {
                addRetrievalTime({
                    name: contract.name,
                    time: retrievalTime
                });

                this.onExpiringExtendedTime(contract);
            }
        });
    };

    let filterExpiredContract = (expiredContract) => {
        let snapshotContracts = this.contractData.filter(contract =>
            contract.name === expiredContract.name
        );

        return snapshotContracts[0];
    };

    let addRetrievalTime = ({name, time}) => {
        this.retrievalTimeWatcher.objectsToWatch.push({
            name: name,
            time: time
        });

        if(!this.retrievalTimeWatcher.isWatching()){
            this.retrievalTimeWatcher.watch();
        }
    };

    let createWaitLog = (contracts) => {
        let log = `${'Contract:'.padEnd(45)}Extended time expires:\n`;

        if(this.contractData.length > 0){
            this.contractData.forEach(contract => {
                log += `${contract.contractAddress.padEnd(45)}${new Date(contract.extendedTimeCloses)}\n`;
            });
        } else {
            contracts.forEach(contract => {
                log += `${contract.contractAddress.padEnd(45)}${new Date(contract.extendedTimeCloses)}\n`;
            });
        }

        return log;
    };

    let fetchContracts = () => {
        return fetchAllCryptoContracts().then(contracts => {
            this.contractData = contracts.filter(contract =>
                contract.extendedTimeCloses > Date.now()
            );

            this.extendedTimeWatcher = new TimeWatcher(
                this.contractData.map(contract => {
                    return {
                        name: contract.name,
                        time: contract.extendedTimeCloses
                    }
                }),
                onExtendedTimeExpired
            );

            if(this.extendedTimeWatcher.objectsToWatch.length > 0){
                this.extendedTimeWatcher.watch();
            }

            return {
                log: createWaitLog(contracts),
                watcher: this.extendedTimeWatcher,
                contractData: this.contractData
            };
        });
    };

    this.isFetching = false;
    this.retrievalTimeWatcher = new TimeWatcher([], onRetrievalTimeExpired);

    this.launch = ({onSnapshotSaved = undefined, onExpiringExtendedTime = undefined}) => {
        this.isFetching = true;

        if(onSnapshotSaved !== undefined){
            this.onSnapshotSaved = onSnapshotSaved;
        }

        if(onExpiringExtendedTime !== undefined){
            this.onExpiringExtendedTime = onExpiringExtendedTime;
        }

        return fetchContracts().then(contracts => {
            this.isFetching = false;
            return contracts;
        });
    };

    this.stop = () => {
        return new Promise((resolve) => {
            if(this.isFetching){
                let timer = setInterval(() => {
                    if(!this.isFetching){
                        if(this.extendedTimeWatcher.isWatching()){
                            this.extendedTimeWatcher.stopWatching();
                        }

                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            } else {
                if(this.extendedTimeWatcher.isWatching()){
                    this.extendedTimeWatcher.stopWatching();
                }

                resolve();
            }
        });

    };

    this.reLaunch = () => {
        return this.stop().then(() => {
            return this.launch({});
        });
    };
}

module.exports = SnapshotService;