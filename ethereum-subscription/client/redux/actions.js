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

export const updateUser = (user) => ({
    type: constants.UPDATE_USER,
    payload: user
});

export const updateMetamaskAccount = (metamaskAccount) => ({
    type: constants.UPDATE_METAMASK_ACCOUNT,
    payload: metamaskAccount
});