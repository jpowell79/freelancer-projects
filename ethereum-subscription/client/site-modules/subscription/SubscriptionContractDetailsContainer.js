import React, {Component} from 'react';
import {SubscriptionContractDetails} from "./SubscriptionContractDetails";
import objects from "../../../services/datatypes/objects";
import {loadServerDataIntoStoreFromClient} from "../../services/loaders/loadServerDataIntoStore";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import alerts from "../../services/views/alerts";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import withMessage from "../../hocs/withMessage";
import {waitingForBlockchain} from "../../services/views/messages";

class SubscriptionContractDetailsContainer extends Component {
    handleAddSubscriptionFormSubmit = (event, removeAlert, disableAlert) => {
        if(this.addSubscriptionForm.hasFieldErrors()) return;

        disableAlert()
            .then(() => this.addSubscriptionForm.onSubmit())
            .then(transaction => {
                alerts.showTransactionAlert({
                    transaction,
                    etherScanUrl: this.props.settings.etherScanUrl.value,
                    messageHeader: "Your subscription request has been sent successfully!",
                    messageList: [
                        'The supplier has been notified of your request. You will ' +
                        'receive an email within 24 hours.'
                    ]
                }, {
                    title: 'Subscription Request Sent',
                });

                removeAlert();
            })
            .then(() => loadServerDataIntoStoreFromClient(this.props.dispatch, {
                subscribers: true,
                subscriptions: true
            }))
            .catch(err => {
                console.error(err);

                AlertOptionPane.showErrorAlert({
                    title: 'Subscription Request Cancelled',
                    message: 'Something went wrong during the transaction process.'
                });

                removeAlert();
            });
    };

    handleCancelSubscription = (contract) => {
        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: contract.address
        });

        this.props.setIsLoading(waitingForBlockchain)
            .then(() => subscriptionContract.cancelSubscription({
                subscriberOrSupplier: this.props.metamaskAccount.address
            })).then(transaction => {
                console.log(transaction);

                alerts.showTransactionAlert({
                    transaction,
                    etherScanUrl: this.props.settings.etherScanUrl.value,
                    messageHeader: "The subscription was cancelled successfully"
                }, {
                    message: "The subscription was cancelled successfully!"
                });

                return this.props.setClearedMessageState()
                    .then(() => this.loadContract());
            }).catch(() => {
                return this.props.setClearedMessageState()
                    .then(() => {
                        AlertOptionPane.showErrorAlert({
                            message: 'Something went wrong when trying to cancel the subscription'
                        });
                    });
            })
    };

    handleSubscribe = (contract) => {
        if(objects.isEmpty(this.props.metamaskAccount)){
            AlertOptionPane.showInfoAlert({
                message: "You need to login to metamask in order to make a subscription"
            });

            return;
        }

        alerts.showAddSubscriptionFormAlert({
            contract,
            onConfirm: this.handleAddSubscriptionFormSubmit,
            ref: (form) => {
                this.addSubscriptionForm = form;
            },
            ...this.props
        });
    };

    isSubscriberOfContract = () => {
        const contract = this.props.liveSubscriptionContracts[0];
        const subscribers = this.props.subscribers.filter(subscriber =>
            subscriber.walletAddress === this.props.metamaskAccount.address
        );
        const subscriber = (subscribers[0]) ? subscribers[0] : {};
        const subscriptions = this.props.subscriptions.filter(subscription =>
            subscription.contractId === contract.id
        );

        return subscriptions.filter(subscription =>
            subscription.subscriberId === subscriber.id
        ).length > 0;
    };

    render(){
        const contract = this.props.liveSubscriptionContracts[0];

        return (
            (!contract)
                ? (
                    <p className="text text-center">
                        A contract with the given address could not be found.
                    </p>
                ) : (
                    (this.props.messageState.isLoading) ? (
                        this.props.renderMessages()
                    ) : (
                        <SubscriptionContractDetails
                            {...contract}
                            {...this.props.subscriptionDetails}
                            {...this.props.trialSubscriptionDetails}
                            isOwner={
                                this.props.ownerUser.walletAddress ===
                                this.props.metamaskAccount.address
                            }
                            isSubscriber={this.isSubscriberOfContract()}
                            onSubscribe={() => this.handleSubscribe(contract)}
                            onCancelSubscription={() => this.handleCancelSubscription(contract)}
                        />
                    )
                )
        );
    }
}

export default withMessage(SubscriptionContractDetailsContainer);