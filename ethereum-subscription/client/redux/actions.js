import {constants} from './constants';

export const loadSettings = (settings) => ({
    type: constants.LOAD_SETTINGS,
    payload: settings
});

export const isLoadingAccount = () => ({
    type: constants.UPDATE_ACCOUNT,
    payload: {
        isLoading: true
    }
});

export const updateAccount = (account) => ({
    type: constants.UPDATE_ACCOUNT,
    payload: account
});