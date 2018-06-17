import {constants} from './constants';
import {combineReducers} from 'redux';
import {defaultCrypto} from "../components/crypto/defaultCrypto";

//TODO: better define default marketData?
export const initialState = {
    crypto: defaultCrypto,
    marketData: [],
    feeds: [],
    isLoadingFeeds: true,
    isLoadingMarketData: true
};

export const feeds = (state = [], action) => {
    switch(action.type){
    case constants.UPDATE_FEEDS:
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

export const crypto = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_CRYPTO:
        return state.map((cryptoRow) => {
            if(cryptoRow.name.toLowerCase() === action.payload.name.toLowerCase()
                && cryptoRow.index === action.payload.index){
                return action.payload;
            }

            return cryptoRow;
        });
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

export const isLoadingMarketData = (state = true, action) => {
    switch(action.type){
    case constants.IS_LOADING_MARKET_DATA:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    crypto,
    marketData,
    feeds,
    isLoadingMarketData,
    isLoadingFeeds
});