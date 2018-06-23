const web3 = require('web3');
const Settings = require('../../../site-settings');

function Web3(provider){
    web3.call(this, provider);

    this.eth.defaultAccount = Settings.DEFAULT_ACCOUNT;

    this.isMetaMask = () => {
        return this.currentProvider.isMetaMask;
    };

    this.getAccountAddress = () => {
        return this.eth.getAccounts().then(accounts => {
            //TODO: Remove later.
            if(accounts.length === 0){
                return Web3.eth.defaultAccount;
            }

            return accounts[0];
        });
    };

    this.getBalance = (accountAddress) => {
        return this.eth.getBalance(accountAddress)
            .then(balance => balance/1000000000000000000)
    };
}

Web3.prototype = Object.create(web3.prototype);
Web3.prototype.contructor = Web3;

const getProvider = () => {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        return window.web3.currentProvider;
    }

    return new web3.providers.HttpProvider(
        'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'
    );
};

module.exports = new Web3(getProvider());