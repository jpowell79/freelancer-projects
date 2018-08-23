import React, {Component, Fragment} from 'react';
import SubscriptionForm from "./SubscriptionForm";
import PropTypes from 'prop-types';
import withMetamaskAccount from '../../hocs/withMetamaskAccount';
import {Loader} from "../../modules/icons";
import objects from "../../../services/objects";
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";

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
            address: metamaskAccount.address
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

        setIsLoading();

        return this.setSubscriptionDetails(
            this.props.web3,
            this.props.metamaskAccount,
            messageState
        ).then(() => {
            AlertOptionPane.showSuccessAlert({
                message: 'The contract has been edited successfully'
            });

            this.props.onComplete(this);
        }).catch(err => {
            setMessageState({
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

        if(this.props.metamaskAccount.isLoading){
            return (
                <div className="text-center">
                    <Loader/>
                    <h3>Listening for account changes...</h3>
                </div>
            );
        }

        if(objects.isEmpty(this.props.metamaskAccount)){
            return (
                <p className="text">
                    Please login to metamask in order to edit this contract.
                </p>
            );
        }

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
                    renderExtraButtons={() => {
                        return (
                            <button
                                className="ui button"
                                style={{marginLeft: "15px"}}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.onCancel(this);
                                }}
                            >
                                Cancel
                            </button>
                        );
                    }}
                />
            </Fragment>
        );
    }
}

export default withMetamaskAccount(EditContractForm);