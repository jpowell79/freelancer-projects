import {
    isLoadingCrypto,
    updateAccount,
    updateAllCrypto
} from "../../redux/actions";
import web3 from "../../server/services/Web3/index";
import {fetchAllCryptoContracts} from "../../server/services/contract/index";

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;
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