import {constants} from './constants';
import {combineReducers} from 'redux';

export const initialState = {
    settings: []
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
    settings
});