import {constants} from './constants';

export const sampleAction = () => {
    return {
        type: constants.SAMPLE_ACTION,
        payload: 'Hello Redux!'
    }
};