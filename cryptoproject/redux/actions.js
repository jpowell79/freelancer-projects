import {constants} from './constants';

export const updateFeeds = (feeds) => {
    return {
        type: constants.UPDATE_FEEDS,
        payload: feeds
    }
};

export const updateAllCrypto = (crypto) => {
    return {
        type: constants.UPDATE_ALL_CRYPTO,
        payload: crypto
    }
};

export const updateTradeStatus = (tradeStatus) => {
    return {
        type: constants.UPDATE_TRADE_STATUS,
        payload: tradeStatus
    }
};

export const updateTradeTokens = (tokens) => {
    return {
        type: constants.UPDATE_TRADE_TOKENS,
        payload: tokens
    }
};

export const isLoadingTradeTokens = (isLoading) => {
    return {
        type: constants.IS_LOADING_TRADE_TOKENS,
        payload: isLoading
    }
};

export const isLoadingFeeds = (isLoading) => {
    return {
        type: constants.IS_LOADING_FEEDS,
        payload: isLoading
    }
};

export const updateCrypto = (crypto) => {
    return {
        type: constants.UPDATE_CRYPTO,
        payload: crypto
    }
};

export const updateMarketData = (marketData) => {
    return {
        type: constants.UPDATE_MARKET_DATA,
        payload: marketData
    }
};

export const isLoadingMarketData = (isLoading) => {
    return {
        type: constants.IS_LOADING_MARKET_DATA,
        payload: isLoading
    }
};

export const isLoadingCrypto = (isLoading) => {
    return {
        type: constants.IS_LOADING_CRYPTO,
        payload: isLoading
    }
};