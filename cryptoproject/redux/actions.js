import {constants} from './constants';
import CryptoTrade from "../components/pages/crypto/CryptoContent/CryptoTrade";

/*----------------------------------------
 * Feeds
 *----------------------------------------*/
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

/*----------------------------------------
 * Crypto
 *----------------------------------------*/
export const updateAllCrypto = (crypto) => {
    return {
        type: constants.UPDATE_ALL_CRYPTO,
        payload: crypto
    }
};

export const updateCrypto = (crypto) => {
    return {
        type: constants.UPDATE_CRYPTO,
        payload: crypto
    }
};

/*----------------------------------------
 * Dividend
 *----------------------------------------*/
export const updateDividend = (dividendFund) => {
    return {
        type: constants.UPDATE_DIVIDEND,
        payload: dividendFund
    }
};

export const isLoadingDividend = (isLoading = true) => {
    return {
        type: constants.IS_LOADING_DIVIDEND,
        payload: isLoading
    }
};

/*----------------------------------------
 * Transaction
 *----------------------------------------*/
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

/*----------------------------------------
 * Account
 *----------------------------------------*/
export const updateAccount = ({
    isLoading = true,
    tradeTokens = null,
    address = null,
    balance = null,
    network = null
}) => {
    return {
        type: constants.UPDATE_ACCOUNT,
        payload: {
            isLoading: isLoading,
            address: address,
            tradeTokens: tradeTokens,
            balance: balance,
            network: network
        }
    }
};

/*----------------------------------------
 * Market Data
 *----------------------------------------*/
export const updateMarketData = (marketData) => {
    return {
        type: constants.UPDATE_MARKET_DATA,
        payload: marketData
    }
};