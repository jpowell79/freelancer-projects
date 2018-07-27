import {constants} from './constants';

export const loadSettings = (settings) => {
    return {
        type: constants.LOAD_SETTINGS,
        payload: settings
    }
};