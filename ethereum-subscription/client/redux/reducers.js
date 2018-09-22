import {constants} from "./constants";
import {combineReducers} from "redux";

export const initialState = {
    settings: {},
    metamaskAccount: {},
    liveSubscriptionContracts: [],
    ethereumConversionRates: [],
    subscriptionContracts: [],
    editContract: {},
    subscriptionDetails: {
        username: "",
        password: "",
        subscriptionLengthInWeeks: "",
        supplierEmail: "",
        other: ""
    },
    trialSubscriptionDetails: {
        trialUsername: "",
        trialPassword: "",
        trialDurationInDays: "",
        supplierEmail: "",
        trialOther: ""
    },
    subscriptionTypes: [],
    subscribers: [],
    subscriptions: [],
    user: {},
    users: []
};

export const subscriptionDetails = (subscriptionDetails = {}, action) => {
    switch(action.type){
    case constants.UPDATE_SUBSCRIPTION_DETAILS:
        return action.payload;
    default:
        return subscriptionDetails;
    }
};

export const trialSubscriptionDetails = (trialSubscriptionDetails = {}, action) => {
    switch(action.type){
    case constants.UPDATE_TRIAL_SUBSCRIPTION_DETAILS:
        return action.payload;
    default:
        return trialSubscriptionDetails;
    }
};

export const editContract = (editContract = {}, action) => {
    switch(action.type){
    case constants.EDIT_CONTRACT:
        return action.payload;
    default:
        return editContract;
    }
};

export const ethereumConversionRates = (ethereumConversionRates = [], action) => {
    switch(action.type){
    case constants.UPDATE_ETHEREUM_CONVERSION_RATES:
        return action.payload;
    default:
        return ethereumConversionRates;
    }
};

export const liveSubscriptionContracts = (liveSubscriptionContracts = [], action) => {
    switch(action.type){
    case constants.ADD_LIVE_SUBSCRIPTION_CONTRACTS:
        return [...liveSubscriptionContracts, ...action.payload];
    case constants.UPDATE_LIVE_SUBSCRIPTION_CONTRACTS:
        return action.payload;
    default:
        return liveSubscriptionContracts;
    }
};

export const subscriptions = (subscriptions = [], action) => {
    switch(action.type){
    case constants.UPDATE_SUBSCRIPTIONS:
        return action.payload;
    default:
        return subscriptions;
    }
};

export const subscribers = (subscribers = [], action) => {
    switch(action.type){
    case constants.UPDATE_SUBSCRIBERS:
        return action.payload;
    default:
        return subscribers;
    }
};

export const subscriptionContracts = (subscriptionContracts = [], action) => {
    switch(action.type){
    case constants.UPDATE_SUBSCRIPTION_CONTRACTS:
        return action.payload;
    default:
        return subscriptionContracts;
    }
};

export const subscriptionTypes = (subscriptionTypes = [], action) => {
    switch(action.type){
    case constants.UPDATE_SUBSCRIPTION_TYPES:
        return action.payload;
    default:
        return subscriptionTypes;
    }
};

export const users = (users = [], action) => {
    switch(action.type){
    case constants.UPDATE_USERS:
        return action.payload;
    default:
        return users;
    }
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

export const settings = (settings = {}, action) => {
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
    user,
    users,
    editContract,
    subscriptionContracts,
    liveSubscriptionContracts,
    ethereumConversionRates,
    subscriptionDetails,
    trialSubscriptionDetails,
    subscriptionTypes,
    subscribers,
    subscriptions,
});