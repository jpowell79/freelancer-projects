class CoinMarketCapApi {
    static baseUrl = 'https://api.coinmarketcap.com/v2/';

    static fiatCurrencies = {
        AUD: "AUD", BRL: "BRL", CAD: "CAD", CHF: "CHF", CLP: "CLP",
        CNY: "CNY", CZK: "CZK", DKK: "DKK", EUR: "EUR", GBP: "GBP",
        HKD: "HKD", HUF: "HUF", IDR: "IDR", ILS: "ILS", INR: "INR",
        JPY: "JPY", KRW: "KRW", MXN: "MXN", MYR: "MYR", NOK: "NOK",
        NZD: "NZD", PHP: "PHP", PKR: "PKR", PLN: "PLN", RUB: "RUB",
        SEK: "SEK", SGD: "SGD", THB: "THB", TRY: "TRY", TWD: "TWD",
        ZAR: "ZAR"
    };

    static cryptoCurrencies = {
        AUD: "BTC", ETH: "ETH", XRP: "XRP", LTC: "LTC", BCH: "BCH"
    };

    static sortOptions = {
        id: "id",
        rank: "rank",
        volume_24h: "volume_24h",
        percent_change_24h: "percent_change_24h"
    };

    static defaultOptions = {
        id: -1,
        limit: -1,
        start: -1,
        convert: "",
        sort: ""
    };

    static parseOptions(rawOptions){
        let options = Object.assign({}, CoinMarketCapApi.defaultOptions, rawOptions);
        let optionString = (options.id >= 0) ? `${options.id}/` : '';
        let divider = '?';
        optionString += (options.start >= 0) ? `${divider}start=${options.start}` : '';
        divider = (options.start >= 0) ? '&' : '?';
        optionString += (options.limit > 0) ? `${divider}limit=${options.limit}` : '';
        divider = (options.limit >= 0 || divider === '&') ? '&' : '?';
        optionString += (options.convert !== '') ? `${divider}convert=${options.convert}` : '';
        divider = (options.convert !== '' || divider === '&') ? '&' : '?';
        optionString += (options.sort !== '') ? `${divider}sort=${options.sort}` : '';

        return optionString;
    }

    static ticker(options = CoinMarketCapApi.defaultOptions){
        return `${CoinMarketCapApi.baseUrl}/ticker/${CoinMarketCapApi.parseOptions(options)}`;
    }

    static global(options = CoinMarketCapApi.defaultOptions){
        return `${CoinMarketCapApi.baseUrl}/global/${CoinMarketCapApi.parseOptions(options)}`;
    }

    static listings(){
        return `${CoinMarketCapApi.baseUrl}/listings/`;
    }
}

export default CoinMarketCapApi;