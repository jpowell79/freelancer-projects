import {constants} from './constants';
import {combineReducers} from 'redux';

export const initialState = {
    settings: [],
    account: {}
};

export const account = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_ACCOUNT:
        return action.payload;
    default:
        return state;
    }
};

export const settings = (state = [], action) => {
    switch(action.type){
    case constants.LOAD_SETTINGS:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    settings,
    account
});