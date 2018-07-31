import Dispatcher from "./Dispatcher";
import objects from '../../services/objects';
import {isClient} from '../../services/utils';

const defaultOptions = {
    settings: false,
    user: false
};

export const loadServerDataIntoStore = async (reduxStore, req, options) => {
    const load = Object.assign({}, defaultOptions, options);
    const state = reduxStore.getState();
    const dispatcher = new Dispatcher(reduxStore.dispatch);
    let promises = [];

    if(isClient()) return;

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