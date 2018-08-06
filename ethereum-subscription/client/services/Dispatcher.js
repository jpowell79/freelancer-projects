import axios from 'axios';
import urls from '../../services/constants/urls';
import {
    loadSettings,
    updateMetamaskAccount,
    updateSubscriptionContracts,
    updateSubscriptionTypes,
    updateSubscribers,
    updateSubscriptions,
    isLoadingAccount,
    updateUser
} from "../redux/actions";
import {isServer, serverRequest} from '../../services/utils';
import parser from './parser';

class Dispatcher {
    constructor(dispatch){
        this.dispatch = dispatch;
    }

    request = async ({req, url, callback}) => {
        if(isServer()){
            return serverRequest(req, url)
                .then(callback)
                .catch(err => {
                    console.error(err);
                });
        }

        return axios.get(url)
            .then(callback)
            .catch(err => {
                console.error(err);
            });
    };

    dispatchUpdateSubscriptions = async ({req}) => {
        return this.request({
            req,
            url: urls.subscriptions,
            callback: (response) => {
                this.dispatch(updateSubscriptions(response.data))
            }
        });
    };

    dispatchUpdateSubscribers = async ({req}) => {
        return this.request({
            req,
            url: urls.subscriptionSubscribers,
            callback: (response) => {
                this.dispatch(updateSubscribers(response.data))
            }
        });
    };

    dispatchUpdateSubcriptionContracts = async ({req}) => {
        return this.request({
            req,
            url: urls.subscriptionContracts,
            callback: (response) => {
                this.dispatch(updateSubscriptionContracts(response.data))
            }
        });
    };

    dispatchUpdateSubscriptionTypes = async ({req}) => {
        return this.request({
            req,
            url: urls.subscriptionTypes,
            callback: (response) => {
                this.dispatch(updateSubscriptionTypes(response.data));
            }
        });
    };

    dispatchUpdateUser = async (user) => {
        this.dispatch(updateUser(user));
    };

    dispatchLoadSettings = async ({req}) => {
        return this.request({
            req,
            url: urls.settings,
            callback: (response) => {
                const settings = {};

                response.data.forEach(setting => {
                    settings[setting.name] = setting;
                });

                this.dispatch(loadSettings(parser.parseSettings(settings)));
            }
        });
    };

    dispatchUpdateAccount = async (web3) => {
        this.dispatch(isLoadingAccount());

        return web3.fetchAccount().then(account => {
            this.dispatch(updateMetamaskAccount(account));
        }).catch(err => {
            console.error(err);
            this.dispatch(updateMetamaskAccount({}));
        });
    };
}

export default Dispatcher;