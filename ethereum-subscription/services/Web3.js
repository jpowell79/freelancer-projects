const web3 = require('web3');

function CustomWeb3(provider){
    web3.call(this, provider);

    this.hasMetaMask = () => {
        return this.currentProvider.isMetaMask !== undefined;
    };

    this.onMetamaskUpdate = (callback) => {
        this.currentProvider.publicConfigStore.on('update', callback);
    };

    this.unsubscribeToMetmaskUpdate = (callback) => {
        this.currentProvider.publicConfigStore.unsubscribe(callback);
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

    this.fetchAccount = () => {
        let account = {
            address: null,
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

module.exports = CustomWeb3;