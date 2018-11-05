import {constants} from "./constants";

export const updateTrialSubscriptionDetails = (trialSubscriptionDetails) => ({
    type: constants.UPDATE_TRIAL_SUBSCRIPTION_DETAILS,
    payload: trialSubscriptionDetails
});

export const updateSubscriptionDetails = (subscriptionDetails) => ({
    type: constants.UPDATE_SUBSCRIPTION_DETAILS,
    payload: subscriptionDetails
});

export const selectEditContract = (contract) => ({
    type: constants.EDIT_CONTRACT,
    payload: contract
});

export const deselectEditContract = () => ({
    type: constants.EDIT_CONTRACT,
    payload: {}
});

export const addLiveSubscriptionContracts = (liveSubscriptionContracts) => ({
    type: constants.ADD_LIVE_SUBSCRIPTION_CONTRACTS,
    payload: liveSubscriptionContracts
});

export const updateLiveSubscriptionContract = (liveSubscriptionContract) => ({
    type: constants.UPDATE_LIVE_SUBSCRIPTION_CONTRACT,
    payload: liveSubscriptionContract
});

export const updateLiveSubscriptionContracts = (liveSubscriptionContracts) => ({
    type: constants.UPDATE_LIVE_SUBSCRIPTION_CONTRACTS,
    payload: liveSubscriptionContracts
});

export const updateEthereumConversionRates = (ethereumConversionRates) => ({
    type: constants.UPDATE_ETHEREUM_CONVERSION_RATES,
    payload: ethereumConversionRates
});

export const loadSettings = (settings) => ({
    type: constants.LOAD_SETTINGS,
    payload: settings
});

export const isLoadingAccount = () => ({
    type: constants.UPDATE_METAMASK_ACCOUNT,
    payload: {
        isLoading: true
    }
});

export const updateUsers = (users) => ({
    type: constants.UPDATE_USERS,
    payload: users
});

export const updateSuspendedUsers = (suspendedUsers) => ({
    type: constants.UPDATE_SUSPENDED_USERS,
    payload: suspendedUsers
});

export const updateUser = (user) => ({
    type: constants.UPDATE_USER,
    payload: user
});

export const updateMetamaskAccount = (metamaskAccount) => ({
    type: constants.UPDATE_METAMASK_ACCOUNT,
    payload: metamaskAccount
});

export const updateSubscriptionTypes = (subscriptionTypes) => ({
    type: constants.UPDATE_SUBSCRIPTION_TYPES,
    payload: subscriptionTypes
});

export const updateSubscriptionContracts = (subscriptionContracts) => ({
    type: constants.UPDATE_SUBSCRIPTION_CONTRACTS,
    payload: subscriptionContracts
});

export const updateSubscribers = (subscribers) => ({
    type: constants.UPDATE_SUBSCRIBERS,
    payload: subscribers
});

export const updateSubscriptions = (subscriptions) => ({
    type: constants.UPDATE_SUBSCRIPTIONS,
    payload: subscriptions
});