import {constants} from './constants';
import {combineReducers} from 'redux';

export const initialState = {
    settings: [],
    metamaskAccount: {},
    user: {}
};

export const user = (user = {}, action) => {
    switch(action.type){
    case constants.UPDATE_USER:
        return action.payload;
    default:
        return user;
    }
};

export const metamaskAccount = (metamaskAccount = {}, action) => {
    switch(action.type){
    case constants.UPDATE_METAMASK_ACCOUNT:
        return action.payload;
    default:
        return metamaskAccount;
    }
};

export const settings = (settings = [], action) => {
    switch(action.type){
    case constants.LOAD_SETTINGS:
        return action.payload;
    default:
        return settings;
    }
};

export default combineReducers({
    settings,
    metamaskAccount,
    user
});