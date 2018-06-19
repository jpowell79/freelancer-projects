import {abi} from "./abi";
import web3 from '../../web3/';

export const contractAddresses = [
    '0x25ca14bd7cff6054f78e24ed4a20271b8706c9d7',
    '0xdb918f2e49557f6036cfb8b8ece49a059b9371b7',
    '0x460bcfefe032e8930593e96adefced7cf20b9036',
    '0xa05a051c5273388e43a83ddaa7e4326b56aa394d',
    '0x335c687b1c659862268dfd140a945c7d0028d798',
    '0xc32cbba58545d461f80af539005c26c7f8a1e376',
    '0x512ed6df2486ed493c9407dd24ea1f9d0cddae8f',
    '0xf878d01dbf475e4eb551fa6927ecbcfad866fddf',
    '0x6d83e8f763e0f78e7a571e7eca9dc0bd8c7ed332',
    '0x57045e0485686986c88f8785db74fc5a34c2e7e9'
];

export const getContract = (index) => {
    return new web3.eth.Contract(abi, contractAddresses[index]);
};

export const fetchCryptoContract = (index) => {
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
            contract_address: responses[2],
            rank: responses[3],
            start_price: responses[4]/100000,
            nr_of_trades: parseInt(responses[5], 10),
            standard_time_closes: parseInt(responses[6], 10)*1000,
            extended_time_closes: parseInt(responses[7], 10)*1000,
            pot: (responses[8]/1000000000000000000).toFixed(2)
        };
    });
};

export const fetchAllCryptoContracts = () => {
    return Promise.all(contractAddresses.map((contract, i) =>
        fetchCryptoContract(i)
    ));
};