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