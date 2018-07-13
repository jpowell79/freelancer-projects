import {
    updateAccount,
    updateAllCrypto,
    updateTokenHolderClaim,
    updateCrypto,
    updateMarketData,
    updateClaimInfo
} from "../../redux/actions";
import web3 from "../../server/services/Web3/index";
import {
    fetchAllCryptoContracts,
    fetchTokenHolderClaimContract,
    fetchClaimInformation
} from "../../server/services/contract/index";
import {fetchCryptoContract} from "../../server/services/contract";
import axios from "axios";
import CoinMarketCapApi from "../CoinMarketCapApi";
import Web3 from "../../server/services/Web3";

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;

        this.updateAccount = this.updateAccount.bind(this);
        this.updateAllCrypto = this.updateAllCrypto.bind(this);
        this.updateTokenHolderClaim = this.updateTokenHolderClaim.bind(this);
        this.fetchCryptoContract = this.fetchCryptoContract.bind(this);
        this.fetchMarketData = this.fetchMarketData.bind(this);
        this.subscribeToAccountUpdate = this.subscribeToAccountUpdate.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
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

    async updateClaimInfo(address, claimBlock){
        return fetchClaimInformation(address, claimBlock)
            .then(claimInfo => {
                this.dispatch(updateClaimInfo(claimInfo));
            }).catch(err => {
                this.dispatch(updateClaimInfo({}));
                console.error(err);
            });
    }

    async updateTokenHolderClaim(){
        return fetchTokenHolderClaimContract().then(responses => {
            this.dispatch(updateTokenHolderClaim(
                Object.assign({}, responses, {isLoading: false}
            )));
        }).catch(err => {
            this.dispatch(updateTokenHolderClaim({}));
            console.error(err);
        });
    }

    async updateAllCrypto(){
        return fetchAllCryptoContracts().then((responses) => {
            this.dispatch(updateAllCrypto(responses));
        }).catch(err => {
            console.error(err);
        });
    }

    subscribeToAccountUpdate({getCompareAddress}){
        this.handleAccountUpdate = (data) => {
            let address = (data.selectedAddress === undefined)
                ? null : data.selectedAddress.toLowerCase();
            let accountAddress = (getCompareAddress() === null)
                ? null : getCompareAddress().toLowerCase();

            if(address !== accountAddress){
                this.updateAccount();
            }
        };

        if(Web3.hasMetaMask()){
            Web3.onMetamaskUpdate(this.handleAccountUpdate);
        }
    }

    unsubscribe(){
        Web3.unsubscribeToMetmaskUpdate(this.handleAccountUpdate);
    }
}

export default Dispatcher;