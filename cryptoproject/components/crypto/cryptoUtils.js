import {contracts} from "./contract";

export const twitterFeeds = {
    defaultFeed: 'BitcoinMagazine',
    bitcoinMagazine: 'BitcoinMagazine',
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
    list: 'ListHQ',
    decred: 'decredproject',
    zilliqa: 'zilliqa',
    aeternity: 'aeternity',
    bitcoinGold: 'bitcoingold',
    byteom: 'Byteom_Official'
};

export const getTwitterFeeds = (cryptoName) => {
    let feeds = Object.keys(twitterFeeds)
        .filter(feedKey =>
            feedKey.toLowerCase().startsWith(cryptoName.toLowerCase())
        );

    if(feeds.length > 0){
        return feeds;
    } else {
        return [twitterFeeds.defaultFeed];
    }
};

export const getDefaultCrypto = ({index}) => {
    return {
        rank: 0,
        name: '',
        index: index,
        start_price: '1',
        nr_of_trades: 0,
        pot: 0,
        standard_time_closes: 0,
        extended_time_closes: 0,
        last_updated: 0,
        contract_address: 'undefined',
        admin: 'undefined',
        circulating_supply: 0
    }
};

export const fetchCryptoContract = (index) => {
    const methods = contracts[index].methods;

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
            nr_of_trades: parseInt(responses[5], 10),
            standard_time_closes: parseInt(responses[6], 10),
            extended_time_closes: parseInt(responses[7], 10),
            pot: (responses[8]/1000000000000000000).toFixed(2)
        };
    });
};

export const fetchAllCryptoContracts = () => {
    return Promise.all(contracts.map((contract, i) =>
        fetchCryptoContract(i)
    ));
};