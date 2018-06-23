'use strict';

require('../utils/padEnd');
const axios = require('axios');
const fetchAllCryptoContracts = require('../contract/').fetchAllCryptoContracts;
const TimeWatcher = require('../TimeWatcher/');
const CoinMarketCapApi = require('../../../components/CoinMarket/CoinMarketCapApi');
const HistoricDataHelper = require('../databaseHelpers/HistoricDataHelper');

function SnapshotService({onSnapshotSaved = () => {}}){
    let onTimeExpired = async (time) => {
        let snapshotContracts = this.contractData.filter(contract =>
            contract.extendedTimeCloses === time
        );

        if(snapshotContracts.length === 0) return;

        let contract = snapshotContracts[0];

        if(contract.finishPrice === 0){
            let finishPrice;

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

                    return HistoricDataHelper.create(
                        Object.assign({}, contract, {finishPrice})
                    );
                }).then(() => {
                    return new Promise(resolve => {
                        onSnapshotSaved(contract, finishPrice);
                        resolve();
                    });
                });
        } else {
            return HistoricDataHelper.create(contract).then(() => {
                return new Promise(resolve => {
                    onSnapshotSaved(contract, contract.finishPrice);
                    resolve();
                });
            });
        }
    };

    let createWaitLog = (contracts) => {
        let log = `${'Contract:'.padEnd(45)}Standard time expires:\n`;

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

            this.watcher = new TimeWatcher(
                this.contractData.map(contract => contract.extendedTimeCloses),
                onTimeExpired
            );

            if(this.watcher.timesToWatch.length > 0){
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