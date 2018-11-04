import {
    updateAccount,
    updateAllCrypto,
    updateTokenHolderClaim,
    updateCrypto,
    updateMarketData,
    updateClaimInfo,
    updateTokenSale
} from "../../redux/actions";
import web3 from "../../server/services/Web3/index";
import {
    fetchAllCryptoContracts,
    fetchTokenHolderClaimContract,
    fetchClaimInformation,
    fetchTokenSaleContract
} from "../../server/services/contract/index";
import {fetchCryptoContract} from "../../server/services/contract";
import axios from "axios";
import CoinMarketCapApi from "../CoinMarketCapApi";
import urls from '../../server/services/utils/urls';
import {isClient} from "../utils";
import Settings from '../../site-settings';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";

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
        this.askForPermission = this.askForPermission.bind(this);
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

    async askForPermission(){
        try {
            await ethereum.enable();
        } catch(err){
            AlertOptionPane.showInfoAlert({
                message: (
                    "Please note that the site won't work properly without access " +
                    "to your metamask account."
                )
            });
            console.error(err);
            return false;
        }

        return true;
    };

    async updateAccount(){
        const hasPermission = (window.ethereum) ? await this.askForPermission() : web3;

        if(hasPermission){
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

    async updateAllCrypto({request, hasDatabase}){
        if(!hasDatabase || !Settings.ENABLE_CRYPTO_DATA_SERVICE){
            return fetchAllCryptoContracts()
                .then(responses => {
                    this.dispatch(updateAllCrypto(responses));
                }).catch(err => {
                    console.error(err);
                });
        }

        const dispatchUpdateAllCrypto = (responses) => {
            if(responses.data.length > 0){
                this.dispatch(updateAllCrypto(responses.data[0].cryptoData));
            } else {
                this.dispatch(updateAllCrypto([]));
            }
        };

        if(isClient()){
            return axios(urls.cryptoData)
                .then(dispatchUpdateAllCrypto)
                .catch(err => {
                    console.error(err);
                });
        } else {
            const session = (request) ? request.session : null;
            const url = `http://${request.headers.host}`;

            return axios({
                method: 'get',
                url: url + urls.cryptoData,
                credentials: 'same-origin',
                data: {'session': session}
            }).then(dispatchUpdateAllCrypto).catch(err => {
                console.error(err);
            });
        }
    }

    async updateTokenSale(){
        return fetchTokenSaleContract().then(tokenSale => {
            this.dispatch(updateTokenSale(tokenSale));
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

        if(web3.hasMetaMask()){
            web3.onMetamaskUpdate(this.handleAccountUpdate);
        }
    }

    unsubscribe(){
        if(web3.hasMetaMask()){
            web3.unsubscribeToMetmaskUpdate(this.handleAccountUpdate);
        }
    }
}

export default Dispatcher;