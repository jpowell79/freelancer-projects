let web3 = require('web3');

const Web3 = (() => {
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        return new web3(window.web3.currentProvider);
    }

    const provider = new web3.providers.HttpProvider(
        'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'
    );

    return new web3(provider);
})();

Web3.isMetaMask = () => {
    return Web3.currentProvider.isMetaMask;
};

Web3.getAccountAddress = () => {
    return Web3.eth.getAccounts().then(accounts => {
        //TODO: Remove later.
        if(accounts.length === 0){
            return Web3.eth.defaultAccount;
        }

        return accounts[0];
    });
};

Web3.getBalance = () => {
    return Web3.getAccountAddress().then(accountAddress => {
        return Web3.eth.getBalance(accountAddress);
    }).then(balance => {
        return balance/1000000000000000000;
    });
};

//TODO: Remove later. Used to always access some account during development.
Web3.eth.defaultAccount = '0xB736a9bACC8855531AeF429735D477D4b5A4D208';

module.exports = Web3;