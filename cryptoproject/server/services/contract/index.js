const cryptoAbi = require('./cryptoAbi');
const tokenHolderClaimAbi = require('./tokenHolderClaimAbi');
const tokenSaleAbi = require('./tokenSaleAbi');
const web3 = require('../Web3');
const SETTINGS = require("../../../site-settings");
const {
    DEBUG_MODE,
    CONTRACT_ADDRESSES,
    TOKEN_HOLDER_CLAIM_ADDRESS,
    TOKEN_SALE_CONTRACT_ADDRESS,
    DEBUG_FINISH_PRICE_RETRIEVAL_TIME,
    DEBUG_SMART_CONTRACT,
    DEBUG_TOKEN_HOLDER_CLAIM,
    DEBUG_CLAIM_INFORMATION,
    DEBUG_TOKEN_SALE
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

const fetchTokenHolderClaimContract = () => {
    const methods = new web3.eth.Contract(tokenHolderClaimAbi, TOKEN_HOLDER_CLAIM_ADDRESS).methods;

    return Promise.all([
        methods.thisContractAddress().call(),
        methods.claimBlock().call(),
        methods.claimWindow().call(),
        methods.claimWindowNumber().call(),
        methods.totalEthForThisClaimWindow().call(),
        methods.claimWindowTimeOpened().call(),
        methods.timeUntilWindowCloses().call(),
        methods.claimWindowTimeClosed().call(),
        methods.timeUntilWindowOpens().call(),
        methods.showTotalTokenSupply().call(),
        methods.calculatePercentageEntitlement().call(),
        methods.viewEthEntitlement().call()
    ]).then(responses => {
        return {
            address: responses[0],
            claimBlock: parseInt(responses[1], 10),
            claimWindowIsOpen: responses[2],
            claimWindowNumber: parseInt(responses[3], 10),
            totalEth: parseFloat(responses[4])/1000000000000000000,
            claimWindowTimeOpened: parseInt(responses[5], 10) * 1000,
            timeUntilWindowCloses: parseInt(responses[6], 10) * 1000,
            claimWindowTimeCloses: parseInt(responses[7], 10) * 1000,
            timeUntilWindowOpens: parseInt(responses[8], 10) * 1000,
            totalTokenSupply: parseFloat(responses[9])
        }
    }).then(claim => {
        return Object.assign({}, claim, {
            closeTime: claim.claimWindowTimeOpened + claim.timeUntilWindowCloses,
            openTime: claim.claimWindowTimeCloses + claim.timeUntilWindowOpens
        });
    }).then(claim => {
        return (DEBUG_MODE) ? DEBUG_TOKEN_HOLDER_CLAIM(claim) : claim;
    });
};

const fetchClaimInformation = (address, claimBlock) => {
    const methods = new web3.eth.Contract(tokenHolderClaimAbi, TOKEN_HOLDER_CLAIM_ADDRESS).methods;

    return Promise.all([
        methods.checkTokenBalanceOfCallerAtClaimBlock().call({
            from: address,
            data: claimBlock
        }),
        methods.calculatePercentageEntitlement().call({
            from: address
        }),
        methods.viewEthEntitlement().call({
            from: address
        }),
        methods.checkClaimStatusOfCaller().call({
            from: address
        })
    ]).then(responses => {
        return {
            address: address,
            claimBlockTokenBalance: parseFloat(responses[0]),
            entitlementPercentage: parseFloat(responses[1])/10000000000000000,
            entitlementEth: parseFloat(responses[2])/1000000000000000000,
            hasMadeClaim: responses[3]
        };
    }).then(claimInfo => {
        return (DEBUG_MODE) ? DEBUG_CLAIM_INFORMATION(claimInfo) : claimInfo;
    });
};

const claimEth = (address) => {
    const methods = new web3.eth.Contract(
        tokenHolderClaimAbi,
        TOKEN_HOLDER_CLAIM_ADDRESS
    ).methods;

    return methods.claimEth().send({
        from: address
    });
};

const fetchTokenSaleContract = () => {
    const methods = new web3.eth.Contract(
        tokenSaleAbi,
        TOKEN_SALE_CONTRACT_ADDRESS
    ).methods;

    return Promise.all([
        methods.thisContractAddress().call(),
        methods.timeComplete().call(),
        methods.amountRaised().call(),
        methods.maximumRaised().call()
    ]).then(responses => {
        return {
            address: responses[0],
            completeTime: parseInt(responses[1], 10) * 1000,
            amountRaised: parseFloat(responses[2])/1000000000000000000,
            maximumRaised: parseFloat(responses[3])/1000000000000000000
        }
    }).then(tokenSale => {
        return (DEBUG_MODE) ? DEBUG_TOKEN_SALE(tokenSale) : tokenSale;
    });
};

const buyTokens = ({address, value}) => {
    const methods = new web3.eth.Contract(
        tokenSaleAbi,
        TOKEN_SALE_CONTRACT_ADDRESS
    ).methods;

    return methods.buyTokens(address).send({
        from: address,
        value: web3.utils.toWei(value, 'ether')
    });
};

module.exports = {
    fetchAllCryptoContracts,
    fetchCryptoContract,
    fetchTokenHolderClaimContract,
    fetchClaimInformation,
    fetchTokenSaleContract,
    getCryptoContract,
    getFinishPriceRetrievalTime,
    claimEth,
    buyTokens,
    enterTheGame
};