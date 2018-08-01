import Dispatcher from "./Dispatcher";
import objects from '../../services/objects';
import {isClient, isServer} from '../../services/utils';

const defaultOptions = {
    settings: false,
    user: false,
    data: {}
};

export const loadServerDataIntoStoreFromClient = async (dispatch, options) => {
    if(isServer()) return;

    const dispatcher = new Dispatcher(dispatch);
    const load = Object.assign({}, defaultOptions, options);
    let promises = [];

    if(load.user){
        promises.push(dispatcher.dispatchUpdateUser(options.data.user));
    }

    if(load.settings){
        promises.push(dispatcher.dispatchLoadSettings({}));
    }

    return Promise.all(promises);
};

export const loadServerDataIntoStore = async (reduxStore, req, options) => {
    if(isClient()) return;

    const load = Object.assign({}, defaultOptions, options);
    const state = reduxStore.getState();
    const dispatcher = new Dispatcher(reduxStore.dispatch);
    let promises = [];

    if(load.user && objects.isEmpty(state.user)){
        promises.push(dispatcher.dispatchUpdateUser(
            (req.session.user) ? req.session.user : {}
        ));
    }

    if(load.settings && objects.isEmpty(state.settings)){
        promises.push(dispatcher.dispatchLoadSettings({req}));
    }

    return Promise.all(promises);
};