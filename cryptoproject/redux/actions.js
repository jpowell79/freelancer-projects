import {constants} from './constants';

export const updateFeeds = (feeds) => {
    return {
        type: constants.UPDATE_FEEDS,
        payload: feeds
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