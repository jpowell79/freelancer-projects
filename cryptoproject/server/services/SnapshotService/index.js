'use strict';

require('../utils/padEnd');
const axios = require('axios');
const fetchAllCryptoContracts = require('../contract/').fetchAllCryptoContracts;
const TimeWatcher = require('../TimeWatcher/');
const CoinMarketCapApi = require('../../../components/CoinMarket/CoinMarketCapApi');
const HistoricDataHelper = require('../databaseHelpers/HistoricDataHelper');

function SnapshotService({onSnapshotSaved = () => {}}){
    let onTimeExpired = async (expiredContract) => {
        let snapshotContracts = this.contractData.filter(contract =>
            contract.name === expiredContract.name
        );

        if(snapshotContracts.length === 0) return;

        let contract = snapshotContracts[0];
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

    let createWaitLog = (contracts) => {
        let log = `${'Contract:'.padEnd(45)}Standard time expires:\n`;

        if(this.contractData.length > 0){
            this.contractData.forEach(contract => {
                log += `${contract.contractAddress.padEnd(45)}${new Date(contract.standardTimeCloses)}\n`;
            });
        } else {
            contracts.forEach(contract => {
                log += `${contract.contractAddress.padEnd(45)}${new Date(contract.standardTimeCloses)}\n`;
            });
        }

        return log;
    };

    let fetchContracts = () => {
        return fetchAllCryptoContracts().then(contracts => {
            this.contractData = contracts.filter(contract =>
                contract.standardTimeCloses > Date.now()
            );

            this.watcher = new TimeWatcher(
                this.contractData.map(contract => {
                    return {
                        name: contract.name,
                        time: contract.extendedTimeCloses
                    }
                }),
                onTimeExpired
            );

            if(this.watcher.objectsToWatch.length > 0){
                this.watcher.watch();
            }

            return {
                log: createWaitLog(contracts),
                watcher: this.watcher,
                contractData: this.contractData
            };
        });
    };

    this.isFetching = false;

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
                        if(this.watcher.isWatching()){
                            this.watcher.stopWatching();
                        }

                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            } else {
                if(this.watcher.isWatching()){
                    this.watcher.stopWatching();
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