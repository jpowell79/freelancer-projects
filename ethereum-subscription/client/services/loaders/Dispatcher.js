import axios from "axios";
import urls from "../../../services/constants/urls";
import {
    loadSettings,
    updateMetamaskAccount,
    updateSubscriptionContracts,
    updateSubscriptionTypes,
    updateSubscribers,
    updateSubscriptions,
    isLoadingAccount,
    updateUser,
    updateUsers,
    updateTrialSubscriptionDetails,
    updateSubscriptionDetails
} from "../../redux/actions";
import {isServer, serverRequest} from "../../../services/utils";
import parser from "../parser";

class Dispatcher {
    constructor(dispatch, req = null){
        this.dispatch = dispatch;
        this.req = req;
    }

    request = async ({url, callback}) => {
        if(isServer()){
            return serverRequest(this.req, url)
                .then(callback)
                .catch(console.error);
        }

        return axios.get(url)
            .then(callback)
            .catch(console.error);
    };

    dispatchUpdateSubscriptionDetails = async ({subscriptionContract, supplierAddress}) => {
        return subscriptionContract.viewFullSubscriptionDetails({supplierAddress})
            .then(subscriptionDetails => this.dispatch(
                updateSubscriptionDetails(subscriptionDetails)
            )).then(() => subscriptionContract.viewTrialSubscriptionDetails({supplierAddress}))
            .then(trialSubscriptionDetails => this.dispatch(
                updateTrialSubscriptionDetails(trialSubscriptionDetails)
            )).catch(console.error);
    };

    dispatchUpdateSubscriptions = async () => {
        return this.request({
            url: urls.subscriptions,
            callback: (response) => {
                this.dispatch(updateSubscriptions(response.data))
            }
        });
    };

    dispatchUpdateSubscribers = async () => {
        return this.request({
            url: urls.subscriptionSubscribers,
            callback: (response) => {
                this.dispatch(updateSubscribers(response.data))
            }
        });
    };

    dispatchUpdateSubcriptionContracts = async () => {
        return this.request({
            url: urls.subscriptionContracts,
            callback: (response) => {
                this.dispatch(updateSubscriptionContracts(response.data))
            }
        });
    };

    dispatchUpdateSubscriptionTypes = async () => {
        return this.request({
            url: urls.subscriptionTypes,
            callback: (response) => {
                this.dispatch(updateSubscriptionTypes(response.data));
            }
        });
    };

    dispatchUpdateUsers = async () => {
        return this.request({
            url: urls.users,
            callback: (response) => {
                this.dispatch(updateUsers(response.data));
            }
        })
    };

    dispatchUpdateUser = async (user) => {
        this.dispatch(updateUser(user));
    };

    dispatchLoadSettings = async () => {
        return this.request({
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