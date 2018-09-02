const SubscriptionContract = require('../../../services/smart-contracts/SubscriptionContract');
const web3 = require('web3');

describe('SubscriptionContract', () => {
    const ethereumSubscription = new SubscriptionContract({
        web3: new web3('https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'),
        address: '0x86842a129bd5fd249fb665c23d7ead88e7057153'
    });

    it('Should fetch data', () => {
        return ethereumSubscription
            .fetchSubscriptionData()
            .then(response => {
                console.log(response);
            });
    });
});