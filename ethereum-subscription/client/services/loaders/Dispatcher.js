import axios from "axios";
import {urls, actions} from "../../../services/constants";
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
    updateSubscriptionDetails,
    updateSuspendedUsers
} from "../../redux/actions";
import {isServer, serverRequest} from "../../../services/utils";
import parser from "../parser";
import objects from "../../../services/datatypes/objects";
import strings from "../../../services/datatypes/strings";
import etherscan from "../../../services/api/etherscan";

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
        return subscriptionContract.getSubscriptionActive()
            .then(subscriptionActive => (subscriptionActive)
                ? subscriptionContract.viewFullSubscriptionDetails({supplierAddress}) : {}
            ).then(subscriptionDetails => (!objects.isEmpty(subscriptionDetails)) &&
                this.dispatch(updateSubscriptionDetails(subscriptionDetails)
            )).then(() => subscriptionContract.getTrialActive())
            .then(trialActive => (trialActive)
                ? subscriptionContract.viewTrialSubscriptionDetails({supplierAddress}) : {}
            ).then(trialSubscriptionDetails => (!objects.isEmpty(trialSubscriptionDetails)) &&
                this.dispatch(updateTrialSubscriptionDetails(trialSubscriptionDetails)
            )).catch(console.error);
    };

    dispatchUpdateSubscriptions = async () => {
        return this.request({
            url: urls.subscriptions,
            callback: (response) => this.dispatch(updateSubscriptions(response.data))
        });
    };

    dispatchUpdateSubscribers = async () => {
        return this.request({
            url: urls.subscriptionSubscribers,
            callback: (response) => this.dispatch(updateSubscribers(response.data))
        });
    };

    dispatchUpdateSubcriptionContracts = async () => {
        return this.request({
            url: urls.subscriptionContracts,
            callback: (response) => this.dispatch(updateSubscriptionContracts(response.data))
        });
    };

    dispatchUpdateSubscriptionTypes = async () => {
        return this.request({
            url: urls.subscriptionTypes,
            callback: (response) => this.dispatch(updateSubscriptionTypes(response.data))
        });
    };

    dispatchUpdateUsers = async () => {
        return this.request({
            url: urls.users,
            callback: (response) => this.dispatch(updateUsers(response.data))
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

    dispatchUpdateSuspendedUsers = async () => {
        return this.request({
            url: `${urls.users}/${actions.getSuspendedSuppliers}`,
            callback: (response) => this.dispatch(updateSuspendedUsers(response.data))
        });
    };

    dispatchAddWalletAddressToUser = async (user) => {
        return etherscan.getWalletAddressTransactions({
            walletAddress: user.walletAddress
        }).then(transactions => {
            const walletAge = (transactions.result[0])
                ? strings.toDateString(
                    new Date(parseInt(transactions.result[0].timeStamp, 10) * 1000)
                )
                : "Unavailable";

            this.dispatch(updateUser(Object.assign({}, user, {walletAge})));
        }).catch(console.error);
    };
}

export default Dispatcher;