import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import SubscriptionForm from "./SubscriptionForm";
import PropTypes from "prop-types";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import {getTransactionMessage, waitingForBlockchain} from "../../services/views/messages";
import {getErrorString} from "../../services/utils";

class EditContractForm extends Component {
    static mapStateToProps = ({settings}) => ({
        etherScanUrl: (settings.etherScanUrl) ? settings.etherScanUrl.value : ""
    });

    static defaultProps = {
        onCancel: () => {},
        onComplete: () => {}
    };

    static propTypes = {
        contract: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        onCancel: PropTypes.func,
        onComplete: PropTypes.func
    };

    setSubscriptionDetails = (web3, metamaskAccount, {
        subscriptionName,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        subscriptionDetails,
        exitFee,
        joinFee,
    }) => {
        return new SubscriptionContract({
            web3,
            address: this.props.contract.address
        }).setSubscriptionDetailsAsSupplier({
            subscriptionName,
            subscriptionLengthInWeeks,
            subscriptionPrice,
            joinFee,
            exitFee,
            subscriptionDetails,
            supplierEmail: this.props.user.email,
            supplier: metamaskAccount.address
        });
    };

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors(this.state)) return;

        const {
            messageState,
            setClearedMessageState,
            setIsLoading
        } = subscriptionForm.props;

        return setIsLoading(waitingForBlockchain)
            .then(() => this.setSubscriptionDetails(
                this.props.web3,
                this.props.metamaskAccount,
                messageState
            ))
            .then(transaction => setClearedMessageState(
                getTransactionMessage(transaction, this.props.etherScanUrl)
            ))
            .then(() => this.props.onComplete(this))
            .catch(err => {
                console.error(err);

                return setClearedMessageState({
                    errors: [getErrorString(err)]
                });
            });
    };

    render(){
        const {
            address,
            type,
            subscriptionName,
            subscriptionLengthInWeeks,
            totalSubscriptionPrice,
            joiningFee,
            exitFee,
            smallDetails
        } = this.props.contract;

        return (
            <Fragment>
                <h2>Edit Contract</h2>
                <SubscriptionForm
                    renderTopChildren={() => {
                        return (
                            <Fragment>
                                <p className="text">
                                    <strong>The address of this smart contract is:</strong> {
                                    address}
                                </p>
                                <p className="text">
                                    <strong>Your ethereum wallet address is:</strong> {
                                    this.props.metamaskAccount.address}
                                </p>
                            </Fragment>
                        );
                    }}
                    onSubmit={this.handleSubmit}
                    hideFields={["contactDetails", "hasFreeTrials"]}
                    defaultState={{
                        subscriptionName,
                        subscriptionType: type,
                        subscriptionLengthInWeeks,
                        subscriptionPrice: totalSubscriptionPrice,
                        joinFee: joiningFee,
                        exitFee,
                        subscriptionDetails: smallDetails
                    }}
                />
            </Fragment>
        );
    }
}

export default connect(EditContractForm.mapStateToProps)(EditContractForm);