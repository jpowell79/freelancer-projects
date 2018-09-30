import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    factoryContract: {},
    templateContract: {}
};

export const factoryContract = (factoryContract = {}, action) => {
    switch(action.type){
    case constants.UPDATE_FACTORY_CONTRACT:
        return action.payload;
    default:
        return factoryContract;
    }
};

export const templateContract = (templateContract = {}, action) => {
    switch(action.type){
    case constants.UPDATE_TEMPLATE_CONTRACT:
        return action.payload;
    default:
        return templateContract;
    }
};

export default combineReducers({
    factoryContract,
    templateContract
});