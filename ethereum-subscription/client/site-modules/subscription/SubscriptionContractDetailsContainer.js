import React, {Component} from "react";
import {SubscriptionContractDetails} from "./SubscriptionContractDetails";
import objects from "../../../services/datatypes/objects";
import DatabaseDataLoader from "../../services/loaders/DatabaseDataLoader";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import alerts from "../../services/views/alerts";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import withMessage from "../../hocs/withMessage";
import {waitingForBlockchain, waitingForEmails} from "../../services/views/messages";
import {updateLiveSubscriptionContract} from "../../redux/actions";
import email from "../../../services/api/email";
import ContractQuery from "../../services/ContractQuery";

class SubscriptionContractDetailsContainer extends Component {
    constructor(props){
        super(props);

        this.contractQuery = new ContractQuery(this.props.liveSubscriptionContracts[0]);
    }

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
                        "The supplier has been notified of your request. You will " +
                        "receive an email within 24 hours."
                    ]
                }, {
                    title: "Subscription Request Sent",
                });

                removeAlert();
            })
            .then(() => {
                return new DatabaseDataLoader(this.props.dispatch, {
                    subscribers: true,
                    subscriptions: true
                }).loadFromClientSide();
            })
            .catch(err => {
                console.error(err);

                AlertOptionPane.showErrorAlert({
                    title: "Subscription Request Cancelled",
                    message: "Something went wrong during the transaction process."
                });

                removeAlert();
            });
    };

    handleCancelSubscription = (contract) => {
        let transaction = {};

        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: contract.address
        });

        this.props.setIsLoading(waitingForBlockchain)
            .then(() => subscriptionContract.cancelSubscription({
                subscriberOrSupplier: this.props.metamaskAccount.address
            })).then(transactionRes => {
                console.log(transactionRes);
                transaction = transactionRes;

                return this.props.setIsLoading(waitingForEmails);
            }).then(() => email.sendSubscriptionCancelledMails({
                subscriptionName: contract.subscriptionName,
                supplierEmail: this.props.ownerUser.email,
                subscriberEmail: this.contractQuery.getSubscriber({
                    subscriptions: this.props.subscriptions,
                    subscribers: this.props.subscribers
                }).email,
                cancelRole: (this.props.ownerUser.walletAddress ===
                    this.props.metamaskAccount.address) ? "supplier" : "subscriber"
            })).then(() => {
                this.props.dispatch(updateLiveSubscriptionContract(
                    Object.assign({}, contract, {subscriptionCancelled: true})
                ));

                alerts.showTransactionAlert({
                    transaction,
                    etherScanUrl: this.props.settings.etherScanUrl.value,
                    messageHeader: "The subscription was cancelled successfully"
                }, {
                    message: "The subscription was cancelled successfully!"
                });

                return this.props.setClearedMessageState();
            }).catch(err => {
                console.error(err);

                return this.props.setClearedMessageState()
                    .then(() => {
                        AlertOptionPane.showErrorAlert({
                            message: "Something went wrong when trying to cancel the subscription"
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
        return this.contractQuery.isSubscriber({
            subscriptions: this.props.subscriptions,
            subscribers: this.props.subscribers,
            walletAddress: this.props.metamaskAccount.address
        });
    };

    render(){
        const contract = this.props.liveSubscriptionContracts[0];

        const details = (contract.subscriptionActive) ? this.props.subscriptionDetails
            : (contract.trialActive) ? this.props.trialSubscriptionDetails : {};

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
                            {...details}
                            subscriptionLengthInWeeks={contract.subscriptionLengthInWeeks}
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