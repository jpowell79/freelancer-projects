export const cryptoNames = {
    bitcoin: 'Bitcoin',
    litecoin: 'Litecoin',
    skipped: "Skipped",
    ripple: "Ripple",
    nxt: "Nxt",
    dogecoin: "Dogecoin",
    digiByte: "DigiByte",
    reddCoin: "ReddCoin",
    monaCoin: "MonaCoin",
    maidSafeCoin: "MaidSafeCoin",
    monero: "Monero",
    byteCoin: "Bytecoin",
    bitShares: "BitShares",
    stellar: "Stellar",
    syscoin: "Syscoin",
    verge: "Verge",
    tether: "Tether",
    nem: "NEM",
    ethereum: "Ethereum",
    siacoin: "Siacoin",
    augur: "Augur",
    decred: "Decred",
    pivx: "PIVX",
    lisk: "Lisk",
    digixDao:"DigixDAO",
    steem: "Steem"
};

export const twitterFeeds = {
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
    let nameKey = Object.keys(cryptoNames)
        .filter(name => cryptoNames[name] === cryptoName);
    let feeds = Object.keys(twitterFeeds)
        .filter(feedKey => feedKey.startsWith(nameKey));

    if(feeds.length > 0){
        return feeds;
    } else {
        return [twitterFeeds.bitcoinMagazine];
    }
};

export const getDefaultCrypto = ({name, index}) => {
    return {
        rank: 0,
        name: name,
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

export const fetchCryptoContract = (contract, index) => {
    const methods = contract.methods;

    return Promise.all([
        methods.admin().call(),
        methods.cryptoname().call(),
        methods.thisContractAddress().call(),
        methods.startrank().call(),
        methods.startprice().call(),
        methods.numberoftrades().call(),
        methods.standardtimecloses().call(),
        methods.extendedtimecloses().call()
    ]).then(responses => {
        return {
            index: index,
            admin: responses[0],
            name: responses[1],
            contract_address: responses[2],
            rank: responses[3],
            start_price: responses[4],
            nr_of_trades: parseInt(responses[5], 10),
            standard_time_closes: parseInt(responses[6], 10),
            extended_time_closes: parseInt(responses[7], 10),
            pot: 0
        };
    });
};