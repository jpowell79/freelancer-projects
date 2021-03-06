import {constants} from './constants';
import {combineReducers} from 'redux';
import CryptoTrade from "../components/pages/crypto/CryptoContent/CryptoTrade";

const DEFAULT_ACCOUNT = {
    isLoading: true,
    address: null,
    tradeTokens: null,
    balance: null,
    network: null
};

export const initialState = {
    crypto: [],
    marketData: [],
    feeds: [],
    isLoadingFeeds: true,
    transaction: {
        inProgress: false,
        tradeStatus: CryptoTrade.tradeStatus.idle
    },
    tokenHolderClaim: {
        isLoading: true
    },
    account: DEFAULT_ACCOUNT,
    claimInfo: {},
    tokenSale: {}
};

export const tokenSale = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_TOKEN_SALE:
        return action.payload;
    default:
        return state;
    }
};

export const claimInfo = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_CLAIM_INFO:
        return action.payload;
    default:
        return state;
    }
};

export const isLoadingFeeds = (state = true, action) => {
    switch(action.type){
    case constants.IS_LOADING_FEEDS:
        return action.payload;
    default:
        return state;
    }
};

export const tokenHolderClaim = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_TOKEN_HOLDER_CLAIM:
        return action.payload;
    default:
        return state;
    }
};

export const feeds = (state = [], action) => {
    switch(action.type){
    case constants.UPDATE_FEEDS:
        return action.payload;
    default:
        return state;
    }
};

export const crypto = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_CRYPTO:
        if(Object.keys(state).length === 0){
            return [action.payload];
        }

        return state.map((cryptoRow) => {
            if(cryptoRow.index === action.payload.index){
                return action.payload;
            }

            return cryptoRow;
        });
    case constants.UPDATE_ALL_CRYPTO:
        return action.payload;
    default:
        return state;
    }
};

export const transaction = (state = {}, action) => {
    switch(action.type){
    case constants.START_TRANSACTION:
        return action.payload;
    case constants.UPDATE_TRANSACTION_STATUS:
        return action.payload;
    case constants.END_TRANSACTION:
        return action.payload;
    default:
        return state;
    }
};

export const account = (state = {}, action) => {
    switch (action.type){
    case constants.UPDATE_ACCOUNT:
        if(action.payload.address === null){
            return {
                isLoading: action.payload.isLoading,
                tradeTokens: action.payload.tradeTokens,
                address: DEFAULT_ACCOUNT.address,
                balance: action.payload.balance,
                network: action.payload.network
            }
        }

        return action.payload;
    case constants.RESET_ACCOUNT:
        return DEFAULT_ACCOUNT;
    default:
        return state;
    }
};

export const tradeTokens = (state = null, action) => {
    switch(action.type){
    case constants.UPDATE_TRADE_TOKENS:
        return action.payload;
    default:
        return state;
    }
};

export const marketData = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_MARKET_DATA:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    crypto,
    marketData,
    feeds,
    isLoadingFeeds,
    account,
    transaction,
    tokenHolderClaim,
    tokenSale,
    claimInfo
});