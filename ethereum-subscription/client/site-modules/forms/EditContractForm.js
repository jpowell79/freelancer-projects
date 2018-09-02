import React, {Component, Fragment} from 'react';
import SubscriptionForm from "./SubscriptionForm";
import PropTypes from 'prop-types';
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";

class EditContractForm extends Component {
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
        const contract = new SubscriptionContract({
            web3,
            address: this.props.contract.address
        });

        return contract.setSubscriptionDetailsAsSupplier({
            subscriptionName,
            supplierWalletAddress: metamaskAccount.address,
            subscriptionLengthInWeeks: parseFloat(subscriptionLengthInWeeks),
            subscriptionPrice: parseFloat(subscriptionPrice),
            joinFee: parseFloat(joinFee),
            exitFee: parseFloat(exitFee),
            subscriptionDetails,
            supplierEmail: this.props.user.email,
            supplier: metamaskAccount.address
        });
    };

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors(this.state)) return;

        const {
            messageState,
            setMessageState,
            setIsLoading
        } = subscriptionForm.props;

        return setIsLoading()
            .then(() => this.setSubscriptionDetails(
                this.props.web3,
                this.props.metamaskAccount,
                messageState
            ))
            .then(() => setMessageState({
                isLoading: false,
                success: ['The contract has been edited successfully']
            }))
            .then(() => this.props.onComplete(this))
            .catch(err => {
                console.error(err);

                return setMessageState({
                    isLoading: false,
                    errors: [err.toString()]
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
            details
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
                    hideFields={['contactDetails', 'hasFreeTrials']}
                    defaultState={{
                        subscriptionName,
                        subscriptionType: type,
                        subscriptionLengthInWeeks,
                        subscriptionPrice: totalSubscriptionPrice,
                        joinFee: joiningFee,
                        exitFee,
                        subscriptionDetails: details
                    }}
                />
            </Fragment>
        );
    }
}

export default EditContractForm;