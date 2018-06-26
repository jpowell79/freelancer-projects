'use strict';

require('../utils/padEnd');
const axios = require('axios');
const getContract = require('../contract').getContract;
const fetchAllCryptoContracts = require('../contract').fetchAllCryptoContracts;
const TimeWatcher = require('../TimeWatcher/');
const CoinMarketCapApi = require('../../../components/CoinMarket/CoinMarketCapApi');
const HistoricDataHelper = require('../databaseHelpers/HistoricDataHelper');

function SnapshotService({onSnapshotSaved = () => {}}){
    let onRetrievalTimeExpired = (expiredContract) => {
        let contract = filterExpiredContract(expiredContract);

        if(contract === undefined) return;

        return createHistoricData(contract);
    };

    let onExtendedTimeExpired = async (expiredContract) => {
        let contract = filterExpiredContract(expiredContract);

        if(contract === undefined) return;

        let retrievalTime = await getRetrievalTime(contract.index);

        if(retrievalTime === 0){
            let wait = 0;

            let timer = setInterval(async () => {
                let retrievalTime = await getRetrievalTime(contract.index);
                wait += 1;

                if(retrievalTime !== 0){
                    addRetrievalTime({
                        name: contract.name,
                        time: retrievalTime
                    });

                    clearInterval(timer);
                } else if(wait === 10){
                    //After waiting for 10 minutes a valid retrieval time
                    //can probably no longer be expected.
                    clearInterval(timer);
                }
            }, 1000 * 60);
        } else {
            addRetrievalTime({
                name: contract.name,
                time: retrievalTime
            });
        }
    };

    let filterExpiredContract = (expiredContract) => {
        let snapshotContracts = this.contractData.filter(contract =>
            contract.name === expiredContract.name
        );

        return snapshotContracts[0];
    };

    let addRetrievalTime = ({name, retrievalTime}) => {
        this.retrievalTimeWatcher.objectsToWatch.push({
            name: name,
            time: retrievalTime
        });

        if(!this.retrievalTimeWatcher.isWatching()){
            this.retrievalTimeWatcher.watch();
        }
    };

    let createHistoricData = (contract) => {
        let finishPrice = 0;

        return axios.get(CoinMarketCapApi.ticker())
            .then(response => {
                return Object.keys(response.data.data)
                    .map(dataKey => response.data.data[dataKey])
                    .filter(data =>
                        data.name.toLowerCase() === contract.name.toLowerCase()
                    )[0];
            })
            .then(marketData => {
                finishPrice = marketData.quotes.USD.price;

                return HistoricDataHelper.create(contract, finishPrice);
            }).then(() => {
                onSnapshotSaved(contract, finishPrice);
            });
    };

    let getRetrievalTime = async (contractIndex) => {
        return await getContract(contractIndex).methods
            .finishPriceRetrievalTime()
            .call();
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
            //TODO: Handle fetching finish price retrieval time on relaunch.

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

    this.launch = () => {
        this.isFetching = true;

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

                        if(this.retrievalTimeWatcher.isWatching()){
                            this.retrievalTimeWatcher.stopWatching();
                        }

                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            } else {
                if(this.extendedTimeWatcher.isWatching()){
                    this.extendedTimeWatcher.stopWatching();
                }

                if(this.retrievalTimeWatcher.isWatching()){
                    this.retrievalTimeWatcher.stopWatching();
                }

                resolve();
            }
        });

    };

    this.reLaunch = () => {
        return this.stop().then(() => {
            return this.launch();
        });
    };
}

module.exports = SnapshotService;