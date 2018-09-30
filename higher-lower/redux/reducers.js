import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    factoryContract: {}
};

export const factoryContract = (state = {}, action) => {
    switch(action.type){
    case constants.UPDATE_FACTORY_CONTRACT:
        return action.payload;
    default:
        return state;
    }
};

export default combineReducers({
    factoryContract
});