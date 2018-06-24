import {constants} from './constants';
import CryptoTrade from "../components/crypto/CryptoContent/CryptoTrade";

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

export const startTransaction = () => {
    return {
        type: constants.START_TRANSACTION,
        payload: {
            inProgress: true,
            tradeStatus: CryptoTrade.tradeStatus.idle
        }
    }
};

export const updateTransactionStatus = (tradeStatus) => {
    return {
        type: constants.UPDATE_TRANSACTION_STATUS,
        payload: {
            inProgress: true,
            tradeStatus: tradeStatus
        }
    }
};

export const endTransaction = (transaction) => {
    return {
        type: constants.END_TRANSACTION,
        payload: transaction
    }
};

export const updateAccount = ({isLoading = true, tradeTokens = null, address = null}) => {
    return {
        type: constants.UPDATE_ACCOUNT,
        payload: {
            isLoading: isLoading,
            address: address,
            tradeTokens: tradeTokens
        }
    }
};

export const resetAccount = () => {
    return {
        type: constants.RESET_ACCOUNT
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