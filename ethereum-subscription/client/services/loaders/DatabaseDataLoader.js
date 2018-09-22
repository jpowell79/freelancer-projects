import {initialState} from "../../redux/reducers";
import objects from "../../../services/datatypes/objects";
import Dispatcher from "./Dispatcher";
import {isClient, isServer} from "../../../services/utils";

class DatabaseDataLoader {
    static defaultOptions = {
        settings: false,
        user: false,
        subscriptionContracts: false,
        subscriptionTypes: false,
        subscribers: false,
        subscriptions: false
    };

    constructor(dispatch, options, req = null){
        this.options = Object.assign({}, DatabaseDataLoader.defaultOptions, options);
        this.dispatcher = new Dispatcher(dispatch, req);
    }

    loadData = async (storeState = initialState) => {
        let promises = [];

        if(this.options.user && objects.isEmpty(storeState.user)){
            promises.push(this.dispatcher.dispatchUpdateUser(
                (this.req.session.user) ? this.req.session.user : {}
            ));
        }

        if(this.options.settings && objects.isEmpty(storeState.settings)){
            promises.push(this.dispatcher.dispatchLoadSettings());
        }

        if(this.options.users && storeState.users.length === 0){
            promises.push(this.dispatcher.dispatchUpdateUsers());
        }

        if(this.options.subscriptionTypes && storeState.subscriptionTypes.length === 0){
            promises.push(this.dispatcher.dispatchUpdateSubscriptionTypes());
        }

        if(this.options.subscriptionContracts && storeState.subscriptionContracts.length === 0){
            promises.push(this.dispatcher.dispatchUpdateSubcriptionContracts());
        }

        if(this.options.subscribers && storeState.subscribers.length === 0){
            promises.push(this.dispatcher.dispatchUpdateSubscribers());
        }

        if(this.options.subscriptions && storeState.subscriptions.length === 0){
            promises.push(this.dispatcher.dispatchUpdateSubscriptions());
        }

        return Promise.all(promises);
    };

    loadFromClientSide = async () => {
        if(isServer()) return;

        return this.loadData();
    };

    loadFromServerSide = async (reduxStoreState) => {
        if(isClient()) return;

        return this.loadData(reduxStoreState);
    };
}

export default DatabaseDataLoader;