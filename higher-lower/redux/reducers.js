import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    factoryContract: {},
    templateContract: {},
    metamaskAccount: {}
};

export const metamaskAccount = (metamaskAccount = {}, action) => {
    switch(action.type){
    case constants.UPDATE_METAMASK_ACCOUNT:
        return action.payload;
    default:
        return metamaskAccount;
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
    metamaskAccount
});