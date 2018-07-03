import {
    isLoadingCrypto,
    updateAccount,
    updateAllCrypto,
    updateDividend,
    isLoadingDividend
} from "../../redux/actions";
import web3 from "../../server/services/Web3/index";
import {
    fetchAllCryptoContracts,
    fetchDividendContract
} from "../../server/services/contract/index";

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;

        this.updateAccount = this.updateAccount.bind(this);
        this.updateAllCrypto = this.updateAllCrypto.bind(this);
        this.updateDividendFund = this.updateDividendFund.bind(this);
    }

    updateAccount(){
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

    updateDividendFund(){
        this.dispatch(isLoadingDividend(true));

        return fetchDividendContract().then(responses => {
            this.dispatch(updateDividend(
                Object.assign({}, responses, {isLoading: false}
            )));
        }).catch(err => {
            console.error(err);
            this.dispatch(isLoadingDividend(false));
        })
    }

    updateAllCrypto(){
        this.dispatch(isLoadingCrypto(true));

        return fetchAllCryptoContracts().then((responses) => {
            this.dispatch(updateAllCrypto(responses));
            this.dispatch(isLoadingCrypto(false));
        }).catch(err => {
            console.error(err);
            this.dispatch(isLoadingCrypto(false));
        });
    }
}

export default Dispatcher;