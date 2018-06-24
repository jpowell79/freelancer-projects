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

    this.getAccountAddress = () => {
        return this.eth.getAccounts().then(accounts => {
            return accounts[0];
        });
    };

    this.getBalance = (accountAddress) => {
        return this.eth.getBalance(accountAddress)
            .then(balance => balance/1000000000000000000)
    };
}

CustomWeb3.prototype = Object.create(web3.prototype);
CustomWeb3.prototype.contructor = CustomWeb3;

module.exports = new CustomWeb3(getProvider());