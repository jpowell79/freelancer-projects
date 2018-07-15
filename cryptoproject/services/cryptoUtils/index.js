import Strings from "../Strings";

export const cryptoNames = {
    bitcoin: "bitcoin",
    ethereum: "ethereum",
    ripple: "ripple",
    bitcoinCash: "bitcoincash",
    eos: "eos",
    litecoin: "litecoin",
    stellar: "stellar",
    cardano: "cardano",
    iota: "iota",
    tron: "tron",
    tether: "tether",
    neo: "neo",
    dash: "dash",
    monero: "monero",
    nem: "nem",
    binanceCoin: "binancecoin",
    vechain: "vechain",
    ethereumClassic: "ethereumclassic",
    qtum: "qtum",
    omiseGo: "omisego",
    ontology: "ontology",
    zcash: "zcash",
    icon: "icon",
    bytecoin: "bytecoin",
    lisk: "lisk",
    decred: "decred",
    zilliqa: "zilliqa",
    aeternity: "aeternity",
    bitcoingold: "bitcoingold",
    bytom: "bytom"
};

export const twitterFeeds = {
    defaultFeed: 'BitcoinMagazine',
    bitcoinMagazine: 'BitcoinMagazine',
    bitcoinCash: "BITCOINCASH",
    ripple: 'Ripple',
    ethereum: 'ethereum',
    eos: 'EOS_io',
    litecoin: 'LitecoinProject',
    stellar: 'stellarOrg',
    cardano: 'CardanoStiftung',
    iota: 'iotatoken',
    tron: 'Tronfoundation',
    tether: 'Tether_to',
    neo: 'NEO_council',
    dash: 'dashPay',
    monero: 'monero',
    nem: 'NEMofficial',
    binanceCoin: 'binance',
    veChain: 'vechainofficial',
    ethereumClassic: 'eth_classic',
    qtum: 'QtumOfficial',
    omiseGo: 'omise_go',
    ontology: 'OntologyNetwork',
    zcash: 'zcashco',
    icon: 'icx_official',
    bytecoin: 'Bytecoin_BCN',
    lisk: 'LiskHQ',
    decred: 'decredproject',
    zilliqa: 'zilliqa',
    aeternity: 'aeternity',
    bitcoinGold: 'bitcoingold',
    byteom: 'Byteom_Official'
};

export const getTwitterFeeds = (cryptoName) => {
    let name = cryptoName.toLowerCase().replace(/ /g,'');
    
    switch(name){
    case cryptoNames.aeternity:
        return [twitterFeeds.aeternity];
    case cryptoNames.binanceCoin:
        return [twitterFeeds.binanceCoin];
    case cryptoNames.bitcoin:
        return [twitterFeeds.bitcoinMagazine];
    case cryptoNames.bitcoinCash:
        return [twitterFeeds.bitcoinCash];
    case cryptoNames.bitcoingold:
        return [twitterFeeds.bitcoinGold];
    case cryptoNames.bytecoin:
        return [twitterFeeds.bytecoin];
    case cryptoNames.bytom:
        return [twitterFeeds.byteom];
    case cryptoNames.cardano:
        return [twitterFeeds.cardano];
    case cryptoNames.dash:
        return [twitterFeeds.dash];
    case cryptoNames.decred:
        return [twitterFeeds.decred];
    case cryptoNames.eos:
        return [twitterFeeds.eos];
    case cryptoNames.ethereum:
        return [twitterFeeds.ethereum];
    case cryptoNames.ethereumClassic:
        return [twitterFeeds.ethereumClassic];
    case cryptoNames.icon:
        return [twitterFeeds.icon];
    case cryptoNames.iota:
        return [twitterFeeds.iota];
    case cryptoNames.litecoin:
        return [twitterFeeds.litecoin];
    case cryptoNames.lisk:
        return [twitterFeeds.lisk];
    case cryptoNames.monero:
        return [twitterFeeds.monero];
    case cryptoNames.nem:
        return [twitterFeeds.nem];
    case cryptoNames.neo:
        return [twitterFeeds.neo];
    case cryptoNames.omiseGo:
        return [twitterFeeds.omiseGo];
    case cryptoNames.ontology:
        return [twitterFeeds.ontology];
    case cryptoNames.qtum:
        return [twitterFeeds.qtum];
    case cryptoNames.ripple:
        return [twitterFeeds.ripple];
    case cryptoNames.stellar:
        return [twitterFeeds.stellar];
    case cryptoNames.tether:
        return [twitterFeeds.tether];
    case cryptoNames.tron:
        return [twitterFeeds.tron];
    case cryptoNames.vechain:
        return [twitterFeeds.veChain];
    case cryptoNames.zcash:
        return [twitterFeeds.zcash];
    case cryptoNames.zilliqa:
        return [twitterFeeds.zilliqa];
    default:
        console.error(`Twitter feeds for ${name} could not be found`);
        return [];
    }
};

export const calcTotalPercentChange = (startPrice, currentPrice) => {
    if(startPrice === 0){
        return 0;
    }

    let change = currentPrice-startPrice;
    return parseFloat(((change/startPrice)*100).toFixed(2));
};

export const mergeWithMarketData = (cryptoArray, marketData) => {
    const cryptoNames = cryptoArray
        .map(data => data.name)
        .filter(name => Strings.isDefined(name));

    return marketData.filter(data =>
        Strings.includesIgnoreCase(cryptoNames, data.name)
    ).map(data => {
        const correspondingCrypto = cryptoArray
            .filter(cryptoData => Strings.isDefined(cryptoData.name))
            .filter(cryptoData =>
                cryptoData.name.toLowerCase() === data.name.toLowerCase()
            )[0];

        return Object.assign({}, data, correspondingCrypto);
    });
};

export const getHighestPercentTotal = (cryptoMarketData) => {
    return cryptoMarketData.map(data => {
        let value = calcTotalPercentChange(
            data.startPrice, data.quotes.USD.price
        );

        return {
            name: data.name,
            value: parseFloat(value),
            symbol: data.symbol
        }
    }).reduce((accumulator, current) => {
        if(accumulator.value === undefined){
            return current;
        }

        if(isNaN(current.value)){
            return accumulator;
        }

        if(accumulator.value < current.value){
            return current;
        }

        return accumulator;
    });
};

export const getMostPopularCrypto = (cryptoArray) => {
    return cryptoArray.reduce((accumulator, current) => {
        if(accumulator.nrOfTrades < current.nrOfTrades){
            return current;
        }

        return accumulator;
    });
};

export const hasFinishPrice = ({
    standardTimeCloses,
    extendedTimeCloses,
    finishPriceRetrievalTime
}) => {
    let standardTimeIsExpired = standardTimeCloses < Date.now();
    let extendedTimeIsExpired = extendedTimeCloses < Date.now();
    let finishPriceRetrievalTimeIsExpired = finishPriceRetrievalTime < Date.now();

    return standardTimeIsExpired &&
        extendedTimeIsExpired &&
        finishPriceRetrievalTimeIsExpired;
};

export const getPreviousData = (data, prevCryptoMarketData) => {
    const prevData = prevCryptoMarketData.filter(cryptoMarketData =>
        cryptoMarketData.name === data.name
    )[0];

    return (prevData === undefined) ? data : prevData;
};