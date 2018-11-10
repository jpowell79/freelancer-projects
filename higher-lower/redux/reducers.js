import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    factoryContract: {},
    templateContract: {},
    previousContract: {},
    metamaskAccount: {},
    dangerMode: false
};

export const dangerMode = (dangerMode = false, action) => {
    switch(action.type){
    case constants.TURN_OFF_DANGER_MODE:
        return false;
    case constants.TURN_ON_DANGER_MODE:
        return true;
    default:
        return dangerMode;
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

export const previousContract = (previousContract = {}, action) => {
    switch(action.type){
    case constants.UPDATE_PREVIOUS_CONTRACT:
        return action.payload;
    default:
        return previousContract;
    }
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
    templateContract,
    metamaskAccount,
    previousContract,
    dangerMode
});