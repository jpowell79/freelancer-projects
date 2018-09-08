import Dispatcher from "./Dispatcher";
import objects from '../../../services/datatypes/objects';
import {isClient, isServer} from '../../../services/utils';

const defaultOptions = {
    settings: false,
    user: false,
    subscriptionContracts: false,
    subscriptionTypes: false,
    subscribers: false,
    subscriptions: false,
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

    if(load.users){
        promises.push(dispatcher.disptachUpdateUsers({}));
    }

    if(load.subscribers){
        promises.push(dispatcher.dispatchUpdateSubscribers({}));
    }

    if(load.subscriptions){
        promises.push(dispatcher.dispatchUpdateSubscriptions({}));
    }

    if(load.subscriptionContracts){
        promises.push(dispatcher.dispatchUpdateSubcriptionContracts({}));
    }

    if(load.subscriptionTypes){
        promises.push(dispatcher.dispatchUpdateSubscriptionTypes({}));
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

    if(load.users && state.users.length === 0){
        promises.push(dispatcher.disptachUpdateUsers({req}));
    }

    if(load.subscriptionTypes && state.subscriptionTypes.length === 0){
        promises.push(dispatcher.dispatchUpdateSubscriptionTypes({req}));
    }

    if(load.subscriptionContracts && state.subscriptionContracts.length === 0){
        promises.push(dispatcher.dispatchUpdateSubcriptionContracts({req}));
    }

    if(load.subscribers && state.subscribers.length === 0){
        promises.push(dispatcher.dispatchUpdateSubscribers({req}));
    }

    if(load.subscriptions && state.subscriptions.length === 0){
        promises.push(dispatcher.dispatchUpdateSubscriptions({req}));
    }

    return Promise.all(promises);
};