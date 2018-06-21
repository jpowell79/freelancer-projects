'use strict';

require('../utils/padEnd');
const axios = require('axios');
const fetchAllCryptoContracts = require('../contract/').fetchAllCryptoContracts;
const TimeWatcher = require('../TimeWatcher/');
const HistoricData = require('../../models/historic-data');
const CoinMarketCapApi = require('../../../components/CoinMarket/CoinMarketCapApi');

function SnapshotService({onLaunch = () => {}, onSnapshotSaved = () => {}}){
    let saveHistoricData = (contract, finishPrice) => {
        let historicData = new HistoricData({
            name: contract.name,
            startPrice: contract.start_price,
            finishPrice: finishPrice,
            potSize: contract.pot,
            nrOfTrades: contract.nr_of_trades
        });

        historicData.save();
    };

    let onTimeExpired = (time) => {
        let snapshotContracts = this.contractData.filter(contract =>
            contract.standard_time_closes === time
        );

        if(snapshotContracts.length === 0) return;

        let contract = snapshotContracts[0];

        if(contract.finish_price === 0){
            axios.get(CoinMarketCapApi.ticker())
                .then(response => {
                    return Object.keys(response.data.data)
                        .map(dataKey => response.data.data[dataKey])
                        .filter(data =>
                            data.name.toLowerCase() === contract.name.toLowerCase()
                        )[0];
                })
                .then(marketData => {
                    let finishPrice = marketData.quotes.USD.price;
                    saveHistoricData(contract, finishPrice);
                    onSnapshotSaved(contract, finishPrice);
                });
        } else {
            saveHistoricData(contract, contract.finish_price);
            onSnapshotSaved(contract, contract.finish_price);
        }
    };

    let fetchContracts = () => {
        this.isFetching = true;

        fetchAllCryptoContracts().then(response => {
            this.contractData = response.filter(contract =>
                contract.standard_time_closes > Date.now()
            );
            this.watcher = new TimeWatcher(
                this.contractData.map(contract => contract.standard_time_closes),
                onTimeExpired
            );

            let log = `${'Contract:'.padEnd(45)}Standard time expires:\n`;

            if(this.contractData.length > 0){
                this.contractData.forEach(contract => {
                    log += `${contract.contract_address.padEnd(45)}${new Date(contract.standard_time_closes)}\n`;
                });
            } else {
                response.forEach(contract => {
                    log += `${contract.contract_address.padEnd(45)}${new Date(contract.standard_time_closes)}\n`;
                });
            }

            if(this.watcher.timesToWatch.length > 0){
                this.watcher.watch();
            }

            onLaunch(log, this.watcher, this.contractData);
            this.isFetching = false;
        });
    };

    this.isFetching = false;

    this.stop = ({onDone = () => {}}) => {
        if(this.isFetching){
            let timer = setInterval(() => {
                if(!this.isFetching){
                    if(this.watcher.isWatching()){
                        this.watcher.stopWatching();
                    }

                    clearInterval(timer);
                    onDone();
                }
            }, 100);
        } else {
            if(this.watcher.isWatching()){
                this.watcher.stopWatching();
            }

            onDone();
        }
    };

    this.reLaunch = () => {
        this.stop({
            onDone: () => {
                fetchContracts();
            }
        });
    };

    fetchContracts();
}

module.exports = SnapshotService;