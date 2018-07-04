import {
    updateAccount,
    updateAllCrypto,
    updateDividend,
    updateCrypto,
    updateMarketData
} from "../../redux/actions";
import web3 from "../../server/services/Web3/index";
import {
    fetchAllCryptoContracts,
    fetchDividendContract
} from "../../server/services/contract/index";
import {fetchCryptoContract} from "../../server/services/contract";
import axios from "axios";
import CoinMarketCapApi from "../CoinMarketCapApi";

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;

        this.updateAccount = this.updateAccount.bind(this);
        this.updateAllCrypto = this.updateAllCrypto.bind(this);
        this.updateDividendFund = this.updateDividendFund.bind(this);
        this.fetchCryptoContract = this.fetchCryptoContract.bind(this);
        this.fetchMarketData = this.fetchMarketData.bind(this);
    }

    async fetchMarketData(){
        return (
            axios.get(CoinMarketCapApi.ticker())
                .then(response => {
                    return Object.keys(response.data.data).map(dataKey =>
                        response.data.data[dataKey]
                    );
                }).then(marketData => {
                    this.dispatch(updateMarketData(marketData));
                })
        );
    }

    async fetchCryptoContract(index){
        return fetchCryptoContract(index)
            .then(response => {
                this.dispatch(updateCrypto(Object.assign({}, response, {index})));
            }).catch(err => {
                console.error(err);
                this.dispatch(updateCrypto({}));
            });
    }

    async updateAccount(){
        this.dispatch(updateAccount({
            isLoading: true
        }));

        return web3.fetchAccount().then(account => {
            account.isLoading = false;
            this.dispatch(updateAccount(account));
        }).catch(err => {
            console.error(err);
            this.dispatch(updateAccount({isLoading: false}));
        });
    }

    async updateDividendFund(){
        return fetchDividendContract().then(responses => {
            this.dispatch(updateDividend(
                Object.assign({}, responses, {isLoading: false}
            )));
        }).catch(err => {
            console.error(err);
        })
    }

    async updateAllCrypto(){
        return fetchAllCryptoContracts().then((responses) => {
            this.dispatch(updateAllCrypto(responses));
        }).catch(err => {
            console.error(err);
        });
    }
}

export default Dispatcher;