import CoinMarketCapAPI from '../../../services/CoinMarketCapApi/';

describe('parseOptions test', () => {
    it('Returns an empty string without options', () => {
        expect(CoinMarketCapAPI.parseOptions({})).toBe('');
    });

    it('Should add id', () => {
        expect(CoinMarketCapAPI.parseOptions({
            id: 1
        })).toBe('1/');
    });

    it('Should add start', () => {
        expect(CoinMarketCapAPI.parseOptions({
            start: 100
        })).toBe('?start=100');
    });

    it('Should add limit', () => {
        expect(CoinMarketCapAPI.parseOptions({
            limit: 100
        })).toBe('?limit=100');
    });

    it('Should add convert', () => {
        expect(CoinMarketCapAPI.parseOptions({
            convert: CoinMarketCapAPI.cryptoCurrencies.BCH
        })).toBe(`?convert=${CoinMarketCapAPI.cryptoCurrencies.BCH}`);
    });

    it('Should add sort', () => {
        expect(CoinMarketCapAPI.parseOptions({
            sort: CoinMarketCapAPI.sortOptions.id
        })).toBe(`?sort=${CoinMarketCapAPI.sortOptions.id}`);
    });

    it('Should add all options except id', () => {
        expect(CoinMarketCapAPI.parseOptions({
            start: 100,
            limit: 100,
            convert: CoinMarketCapAPI.cryptoCurrencies.BCH,
            sort: CoinMarketCapAPI.sortOptions.id
        })).toBe(
            `?start=100&limit=100&convert=${CoinMarketCapAPI.cryptoCurrencies.BCH
            }&sort=${CoinMarketCapAPI.sortOptions.id}`);
    });

    it('Should add all options', () => {
        expect(CoinMarketCapAPI.parseOptions({
            id: 1,
            start: 100,
            limit: 100,
            convert: CoinMarketCapAPI.cryptoCurrencies.BCH,
            sort: CoinMarketCapAPI.sortOptions.id
        })).toBe(
            `1/?start=100&limit=100&convert=${CoinMarketCapAPI.cryptoCurrencies.BCH
                }&sort=${CoinMarketCapAPI.sortOptions.id}`);
    });
});

describe('Api urls test', () => {
    it('Should return ticker url with given options', () => {
        expect(CoinMarketCapAPI.ticker({
            id: 1,
            start: 100,
            limit: 100,
            convert: CoinMarketCapAPI.cryptoCurrencies.BCH,
            sort: CoinMarketCapAPI.sortOptions.id
        })).toBe(
            `${CoinMarketCapAPI.baseUrl}/ticker/1/?start=100&limit=100&convert=${
                CoinMarketCapAPI.cryptoCurrencies.BCH}&sort=${CoinMarketCapAPI.sortOptions.id}`);
    });

    it('Should return global url with given options', () => {
        expect(CoinMarketCapAPI.global({
            id: 1,
            start: 100,
            limit: 100,
            convert: CoinMarketCapAPI.cryptoCurrencies.BCH,
            sort: CoinMarketCapAPI.sortOptions.id
        })).toBe(
            `${CoinMarketCapAPI.baseUrl}/global/1/?start=100&limit=100&convert=${
                CoinMarketCapAPI.cryptoCurrencies.BCH}&sort=${CoinMarketCapAPI.sortOptions.id}`);
    });

    it('Should return listings url.', () => {
        expect(CoinMarketCapAPI.listings()).toBe(`${CoinMarketCapAPI.baseUrl}/listings/`);
    });
});