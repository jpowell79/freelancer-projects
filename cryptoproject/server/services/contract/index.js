const abi = require('./abi');
const web3 = require('../Web3');
const CONTRACT_ADDRESSES = require("../../../site-settings").CONTRACT_ADDRESSES;

const enterTheGame = (index, {from, value}) => {
    const methods = getContract(index).methods;

    return methods.enterTheGame().send({
        from,
        value: web3.utils.toWei(value, 'ether')
    });
};

const getContract = (index) => {
    return new web3.eth.Contract(abi, CONTRACT_ADDRESSES[index]);
};

const fetchCryptoContract = (index) => {
    const methods = getContract(index).methods;

    return Promise.all([
        methods.admin().call(),
        methods.showCryptoName().call(),
        methods.thisContractAddress().call(),
        methods.showRank().call(),
        methods.showCryptoStartPrice().call(),
        methods.numberOfTrades().call(),
        methods.standardTimeCloses().call(),
        methods.extendedTimeCloses().call(),
        methods.potBalance().call()
    ]).then(responses => {
        return {
            index: index,
            admin: responses[0],
            name: responses[1],
            contractAddress: responses[2],
            rank: responses[3],
            startPrice: responses[4]/100000,
            nrOfTrades: parseInt(responses[5], 10),
            standardTimeCloses: parseInt(responses[6], 10)*1000,
            extendedTimeCloses: parseInt(responses[7], 10)*1000,
            pot: (responses[8]/1000000000000000000).toFixed(2)
        };
    });
};

const fetchAllCryptoContracts = () => {
    return Promise.all(CONTRACT_ADDRESSES.map((contract, i) =>
        fetchCryptoContract(i)
    ));
};

module.exports = {
    fetchAllCryptoContracts,
    fetchCryptoContract,
    getContract,
    enterTheGame
};