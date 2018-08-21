import {constants} from './constants';

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