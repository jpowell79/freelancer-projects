import web3 from "web3";
import {isClient} from "../utils";
import settings from "../../settings.json";

let instance = null;

const getProvider = () => {
    if (isClient() && window.ethereum) {
        return window.ethereum;
    } else if(isClient() && window.web3){
        return window.web3.currentProvider;
    }

    return new web3.providers.HttpProvider(settings.httpProvider);
};

class CustomWeb3 extends web3 {
    static getInstance(){
        if(!instance){
            instance = new CustomWeb3(getProvider());
        }

        return instance;
    }

    constructor(provider){
        super(provider);
    }

    hasMetaMask = () => {
        return this.currentProvider.isMetaMask !== undefined;
    };

    onMetamaskUpdate = (callback) => {
        this.currentProvider.publicConfigStore.on("update", callback);
    };

    unsubscribeToMetmaskUpdate = (callback) => {
        this.currentProvider.publicConfigStore.unsubscribe(callback);
    };

    fetchAccountAddress = () => {
        return this.eth.getAccounts().then(accounts => accounts[0]);
    };

    fetchEthBalance = (accountAddress) => {
        return this.eth.getBalance(accountAddress)
            .then(balance => {
                return balance/1000000000000000000;
            })
    };

    fetchAccount = () => {
        const account = {
            address: null,
            balance: null,
            network: null
        };

        return this.fetchNetworkId().then(netId => {
            account.network = CustomWeb3.getNetworkName(netId);
            return this.fetchAccountAddress();
        }).then(accountAddress => {
            account.address = accountAddress;
            return this.fetchEthBalance(account.address);
        }).then(balance => {
            account.balance = balance;
            return account;
        });
    };

    fetchNetworkId = () => {
        return this.eth.net.getId();
    };

    static getNetworkName(networkId){
        switch(networkId){
        case 1:
            return "Mainnet";
        case 2:
            return "Morden";
        case 3:
            return "Ropsten";
        case 4:
            return "Rinkeby";
        case 8:
            return "Ubiq";
        case 42:
            return "Kovan";
        case 77:
            return "Sokol";
        case 99:
            return "Core";
        case 7762959:
            return "Musicoin";
        case 61717561:
            return "Aquachain";
        default:
            return "Unknown";
        }
    };
}

export default CustomWeb3;