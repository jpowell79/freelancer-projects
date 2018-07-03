const web3 = require('web3');
const Settings = require('../../../site-settings');
const utils = require('../utils');

const getProvider = () => {
    if (utils.isClient() && typeof window.web3 !== 'undefined') {
        return window.web3.currentProvider;
    }

    return new web3.providers.HttpProvider(Settings.HTTP_PROVIDER);
};

function CustomWeb3(provider){
    web3.call(this, provider);

    this.hasMetaMask = () => {
        return this.currentProvider.isMetaMask !== undefined;
    };

    this.fetchAccountAddress = () => {
        return this.eth.getAccounts().then(accounts => {
            return accounts[0];
        });
    };

    this.fetchEthBalance = (accountAddress) => {
        return this.eth.getBalance(accountAddress)
            .then(balance => {
                return balance/1000000000000000000;
            })
    };

    this.fetchTradeTokens = (accountAddress) => {
        return this.eth.call({
            to: Settings.TOKEN_CONTRACT,
            data: `0x70a08231000000000000000000000000${accountAddress.substring(2)}`
        }).then(result => {
            const bn = this.utils.toBN(result).toString();
            return parseFloat(bn);
        });
    };

    this.fetchAccount = () => {
        let account = {
            address: null,
            tradeTokens: null,
            balance: null,
            network: null
        };

        return this.fetchNetworkId().then(netId => {
            account.network = this.getNetworkName(netId);
            return this.fetchAccountAddress();
        }).then(accountAddress => {
            account.address = accountAddress;
            return this.fetchEthBalance(account.address);
        }).then(balance => {
            account.balance = balance;
            return this.fetchTradeTokens(account.address);
        }).then(tradeTokens => {
            account.tradeTokens = tradeTokens;
            return account;
        });
    };

    this.fetchNetworkId = () => {
        return this.eth.net.getId();
    };

    this.getNetworkName = (networkId) => {
        switch(networkId){
        case 1:
            return 'Mainnet';
        case 2:
            return 'Morden';
        case 3:
            return 'Ropsten';
        case 4:
            return 'Rinkeby';
        case 8:
            return 'Ubiq';
        case 42:
            return 'Kovan';
        case 77:
            return 'Sokol';
        case 99:
            return 'Core';
        case 7762959:
            return 'Musicoin';
        case 61717561:
            return 'Aquachain';
        default:
            return 'Unknown';
        }
    };
}

CustomWeb3.prototype = Object.create(web3.prototype);
CustomWeb3.prototype.contructor = CustomWeb3;

module.exports = new CustomWeb3(getProvider());