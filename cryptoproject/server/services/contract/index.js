const abi = require('./abi');
const web3 = require('../web3/index');
const CONTRACT_ADDRESSES = require("../../../site-settings").CONTRACT_ADDRESSES;

const getContract = (index) => {
    return new web3.eth.Contract(abi, CONTRACT_ADDRESSES[index]);
};

const fetchCryptoContract = (index) => {
    const methods = getContract(index).methods;

    //TODO: Changing naming!!
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
            contract_address: responses[2],
            rank: responses[3],
            start_price: responses[4]/100000,
            finish_price: 0,
            nr_of_trades: parseInt(responses[5], 10),
            standard_time_closes: parseInt(responses[6], 10)*1000,
            extended_time_closes: parseInt(responses[7], 10)*1000,
            pot: (responses[8]/1000000000000000000).toFixed(2)
        };
    });
};

const fetchAllCryptoContracts = () => {
    return Promise.all(CONTRACT_ADDRESSES.map((contract, i) =>
        fetchCryptoContract(i)
    ));
};

module.exports.fetchAllCryptoContracts = fetchAllCryptoContracts;
module.exports.fetchCryptoContract = fetchCryptoContract;
module.exports.getContract = getContract;