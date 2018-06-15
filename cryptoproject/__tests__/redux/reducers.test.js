import {crypto, marketData} from "../../redux/reducers";
import {updateCrypto, updateMarketData, isLoadingMarketData} from "../../redux/actions";

let mockCrypto = {
    index: 1,
    rank: 1,
    start_price: 1,
    pot: 1,
    nr_of_trades: 1,
    name: 'Litecoin',
    icon: "../../static/images/picture.png"
};

let mockMarketData = {
    market_cap: 1,
    volume_24h: 2,
    price: 3,
    percent_change_24h: 4
};

let mockState = {
    crypto: [
        mockCrypto,
        Object.assign({}, mockCrypto, {name: 'Bitcoin', rank: 2})
    ],
    marketData: [
        mockMarketData,
        Object.assign({}, mockMarketData, {market_cap: 2})
    ]
};

describe('crypto tests', () => {
    it('Returns state with unrecognized type', () => {
        expect(crypto(mockState.crypto, {type: "Foo"})).toBe(mockState.crypto);
    });

    it('Correctly updates Crypto', () => {
        let modifiedCrypto = Object.assign({}, mockCrypto, {name: 'Bitcoin', rank: 3});
        expect(crypto(mockState.crypto, updateCrypto(modifiedCrypto))[0]).not.toBe(modifiedCrypto);
        expect(crypto(mockState.crypto, updateCrypto(modifiedCrypto))[1]).toBe(modifiedCrypto);
    });
});

describe('marketData tests', () => {
    it('Returns state with unrecognized type', () => {
        expect(marketData(mockState.marketData, {type: "Foo"})).toBe(mockState.marketData);
    });

    it('Correctly updates marketData', () => {
        let modifiedMarketData = Object.assign({}, mockMarketData, ['foo']);
        expect(marketData(mockState.marketData, updateMarketData(modifiedMarketData))).toBe(modifiedMarketData);
    });
});