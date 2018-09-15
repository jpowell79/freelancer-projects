import PromiseQueue from "../../../services/PromiseQueue";
import Web3 from "../../../services/smart-contracts/Web3";
import etherscan from "../../../services/api/etherscan";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import strings from "../../../services/datatypes/strings";
import {updateLiveSubscriptionContracts, addLiveSubscriptionContracts} from "../../redux/actions";
import {isServer} from "../../../services/utils";

class SubscriptionContractLoader {
    constructor({
        dispatch,
        users,
        subscriptionTypes,
        dbSubscriptionContracts,
        subscriptions,
        amountToLoadPerBatch = 100
    }){
        this.dispatch = dispatch;
        this.subscriptionContracts = dbSubscriptionContracts;
        this.users = users;
        this.subscriptionTypes = subscriptionTypes;
        this.subscriptions = subscriptions;
        this.setWeb3IfClient();
        this.amountToLoadPerBatch = amountToLoadPerBatch;
    }

    setWeb3IfClient = () => {
        if(this.web3) return;

        this.web3 = isServer() ? null : Web3.getInstance(window.web3.currentProvider);
    };

    handleError = (err) => {
        console.error(err);
        return err;
    };

    fetchAndMergeContract = (contract) => {
        try {
            const subscriptionContract = new SubscriptionContract({
                web3: this.web3,
                address: contract.address
            });

            let subscriptionData;

            return subscriptionContract.fetchSubscriptionData()
                .then(data => {
                    //TODO: Optimize so subscription and user can be pulled less expensively
                    const subscriptionType = this.subscriptionTypes
                        .find(type => type.id === contract.typeId);
                    const user = this.users
                        .find(user => user.username === contract.ownerUsername);
                    const subscription = this.subscriptions
                        .find(subscription => subscription.contractId === contract.id);

                    subscriptionData = Object.assign({}, data, {
                        ...contract,
                        supplierName: contract.ownerUsername,
                        type: subscriptionType.name,
                        transactionHash: (subscription) ? subscription.transactionHash : ""
                    });

                    return etherscan.getWalletAddressTransactions({
                        walletAddress: user.walletAddress
                    })
                })
                .then(transactions => {
                    const walletAge = (transactions.result[0])
                        ? strings.toDateString(
                            new Date(parseInt(transactions.result[0].timeStamp, 10) * 1000)
                        )
                        : "Unavailable";

                    return Object.assign({}, subscriptionData, {walletAge});
                });
        } catch(err){
            console.error(err);
            return {};
        }
    };

    loadContracts = async (comparator) => {
        this.setWeb3IfClient();

        const dispatchUpdateContracts = contracts => {
            this.dispatch(updateLiveSubscriptionContracts(contracts));
            return contracts;
        };

        return Promise.all(
            this.subscriptionContracts
                .filter(comparator)
                .map(this.fetchAndMergeContract)
        ).then(dispatchUpdateContracts).catch(this.handleError);
    };

    loadAllContracts = async () => {
        this.setWeb3IfClient();

        this.dispatch(updateLiveSubscriptionContracts([]));

        const tasks = Promise.all(this.subscriptionContracts.map(this.fetchAndMergeContract))
            .then(data => this.dispatch(addLiveSubscriptionContracts(data)))
            .catch(this.handleError);

        return new PromiseQueue(tasks, this.amountToLoadPerBatch).run();
    }
}

export default SubscriptionContractLoader;