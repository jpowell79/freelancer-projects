const SubscriptionContract = require('../../../services/smart-contracts/SubscriptionContract');
const web3 = require('web3');

describe('SubscriptionContract', () => {
    const ethereumSubscription = new SubscriptionContract({
        web3: new web3('https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'),
        address: '0x3cbc16e2c379a1584ec821ac5720511ddbf355e0'
    });

    it('Should fetch data', () => {
        return ethereumSubscription
            .fetchSubscriptionData()
            .then(response => {
                console.log(response);
            });
    });
});