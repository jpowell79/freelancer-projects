const cryptoAbi = require('./cryptoAbi');
const dividendAbi = require('./dividendAbi');
const web3 = require('../Web3');
const SETTINGS = require("../../../site-settings");
const {
    DEBUG_MODE,
    CONTRACT_ADDRESSES,
    DIVIDEND_ADDRESS,
    DEBUG_FINISH_PRICE_RETRIEVAL_TIME,
    DEBUG_SMART_CONTRACT,
    DEBUG_DIVIDEND
} = SETTINGS;

const enterTheGame = (index, {from, value}) => {
    const methods = getCryptoContract(index).methods;

    return methods.enterTheGame().send({
        from,
        value: web3.utils.toWei(value, 'ether')
    });
};

const getFinishPriceRetrievalTime = (index) => {
    return getCryptoContract(index).methods
        .finishPriceRetrievalTime()
        .call()
        .then(retrevalTime => {
            return parseInt(retrevalTime, 10) * 1000;
        })
        .then(retrievalTime => {
            return (DEBUG_MODE)
                ? DEBUG_FINISH_PRICE_RETRIEVAL_TIME(retrievalTime)
                : retrievalTime;
        });
};

const getCryptoContract = (index) => {
    return new web3.eth.Contract(cryptoAbi, CONTRACT_ADDRESSES[index]);
};

const fetchCryptoContract = (index) => {
    const methods = getCryptoContract(index).methods;

    return Promise.all([
        methods.admin().call(),
        methods.showCryptoName().call(),
        methods.thisContractAddress().call(),
        methods.showRank().call(),
        methods.showCryptoStartPrice().call(),
        methods.numberOfTrades().call(),
        methods.standardTimeCloses().call(),
        methods.extendedTimeCloses().call(),
        methods.potBalance().call(),
        methods.finishPriceRetrievalTime().call(),
        methods.showCryptoFinishPrice().call()
    ]).then(responses => {
        return {
            index: index,
            admin: responses[0],
            name: responses[1],
            contractAddress: responses[2],
            rank: parseInt(responses[3], 10),
            startPrice: responses[4]/100000,
            nrOfTrades: parseInt(responses[5], 10),
            standardTimeCloses: parseInt(responses[6], 10)*1000,
            extendedTimeCloses: parseInt(responses[7], 10)*1000,
            pot: (responses[8]/1000000000000000000).toFixed(2),
            finishPriceRetrievalTime: parseInt(responses[9], 10) * 1000,
            finishPrice: responses[10]
        };
    }).then(contract => {
        return (DEBUG_MODE) ? DEBUG_SMART_CONTRACT(contract) : contract;
    });
};

const fetchAllCryptoContracts = () => {
    return Promise.all(CONTRACT_ADDRESSES.map((contract, i) =>
        fetchCryptoContract(i)
    ));
};

const fetchDividendContract = () => {
    const methods = new web3.eth.Contract(dividendAbi, DIVIDEND_ADDRESS).methods;

    return Promise.all([
        methods.thisContractAddress().call(),
        methods.showTotalTokenSupply().call(),
        methods.claimWindow().call(),
        methods.closeTime().call(),
        methods.openTime().call(),
        methods.totalDividendForThisClaimWindow().call(),
        methods.dividendBlock().call()
    ]).then(responses => {
        return {
            address: responses[0],
            totalTokenSupply: parseFloat(responses[1]),
            claimWindowIsOpen: responses[2],
            closeTime: parseInt(responses[3], 10) * 1000,
            openTime: parseInt(responses[4], 10) * 1000,
            value: parseFloat((parseFloat(responses[5])/1000000000000000000).toFixed(2)),
            block: parseFloat(responses[6], 10)
        }
    }).then(dividend => {
        return (DEBUG_MODE) ? DEBUG_DIVIDEND(dividend) : dividend;
    });
};

const claimDividend = (address) => {
    const methods = new web3.eth.Contract(dividendAbi, DIVIDEND_ADDRESS).methods;
    return methods.claimDividend().send({
        from: address
    });
};

module.exports = {
    fetchAllCryptoContracts,
    fetchCryptoContract,
    fetchDividendContract,
    getCryptoContract,
    getFinishPriceRetrievalTime,
    claimDividend,
    enterTheGame
};