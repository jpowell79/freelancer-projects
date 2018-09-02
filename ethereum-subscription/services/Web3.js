const web3 = require('web3');

let instance = null;

class CustomWeb3 extends web3 {
    static getInstance(provider){
        if(!instance){
            instance = new CustomWeb3(provider);
        }

        return instance;
    }

    constructor(provider){
        super(provider);

        this.hasMetaMask = this.hasMetaMask.bind(this);
        this.onMetamaskUpdate = this.onMetamaskUpdate.bind(this);
        this.unsubscribeToMetmaskUpdate = this.unsubscribeToMetmaskUpdate.bind(this);
        this.fetchAccountAddress = this.fetchAccountAddress.bind(this);
        this.fetchEthBalance = this.fetchEthBalance.bind(this);
        this.fetchAccount = this.fetchAccount.bind(this);
        this.fetchNetworkId = this.fetchNetworkId.bind(this);
        this.getNetworkName = this.getNetworkName.bind(this);
    }

    hasMetaMask(){
        return this.currentProvider.isMetaMask !== undefined;
    };

    onMetamaskUpdate(callback){
        this.currentProvider.publicConfigStore.on('update', callback);
    };

    unsubscribeToMetmaskUpdate(callback){
        this.currentProvider.publicConfigStore.unsubscribe(callback);
    };

    fetchAccountAddress(){
        return this.eth.getAccounts().then(accounts => {
            return accounts[0];
        });
    };

    fetchEthBalance(accountAddress){
        return this.eth.getBalance(accountAddress)
            .then(balance => {
                return balance/1000000000000000000;
            })
    };

    fetchAccount(){
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

    fetchNetworkId(){
        return this.eth.net.getId();
    };

    getNetworkName(networkId){
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

module.exports = CustomWeb3;