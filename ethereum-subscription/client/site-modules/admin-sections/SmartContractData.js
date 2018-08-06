import React, {Component, Fragment} from 'react';
import SubscriptionForm from "../forms/SubscriptionForm";
import {Form} from 'semantic-ui-react';
import MetamaskProvider from "../../containers/MetamaskProvider";
import SubscriptionContract from '../../../services/smart-contracts/SubscriptionContract';

class SmartContractData extends Component {
    state = {
        supplierWalletAddress: '',
        smartContractAddress: '',
    };

    setSubscriptionDetails = (web3, metamaskAccount, {
        contactDetails,
        subscriptionName,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        subscriptionDetails,
        exitFee,
        joinFee,
    }) => {
        const contract = new SubscriptionContract({
            web3,
            address: this.state.smartContractAddress
        });

        return contract.setSubscriptionDetails({
            subscriptionName,
            supplierWalletAddress: this.state.supplierWalletAddress,
            subscriptionLengthInWeeks: parseFloat(subscriptionLengthInWeeks),
            subscriptionPrice: parseFloat(subscriptionPrice),
            joinFee: parseFloat(joinFee),
            exitFee: parseFloat(exitFee),
            supplierEmail: contactDetails,
            subscriptionDetails,
            admin: metamaskAccount.address
        });
    };

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors(this.state)) return;

        const {
            web3,
            metamaskAccount,
            messageState,
            setMessageState,
            setIsLoading,
            setComplete
        } = subscriptionForm.props;

        setIsLoading();

        return this.setSubscriptionDetails(web3, metamaskAccount, messageState)
            .then(() => {
                setComplete({
                    successTitle: 'The contract has been edited successfully',
                });
            }).catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [err.toString()]
                });
            });
    };

    render(){
        return (
            <Fragment>
                <h2>Edit Smart Contract Data</h2>
                <MetamaskProvider notFoundRenderer={() =>
                    <p className="text">Login to metamask in order to add a new contract.</p>
                }>
                    <SubscriptionForm
                        onSubmit={this.handleSubmit}
                        renderTopChildren={({messageState}) => {
                            return (
                                <Form.Field error={
                                    messageState.fieldsWithErrors.includes('supplierWalletAddress')
                                }>
                                    <label>Supplier Wallet Address</label>
                                    <input
                                        type="text"
                                        value={this.state.supplierWalletAddress}
                                        disabled={messageState.isLoading || messageState.complete}
                                        onChange={(event) => {
                                            this.setState({
                                                supplierWalletAddress: event.target.value
                                            });
                                        }}
                                    />
                                </Form.Field>
                            );
                        }}
                        renderBottomChildren={({messageState}) => {
                            return (
                                <Form.Field error={
                                    messageState.fieldsWithErrors.includes('smartContractAddress')
                                }>
                                    <label>Smart Contract Address</label>
                                    <input
                                        type="text"
                                        value={this.state.smartContractAddress}
                                        disabled={messageState.isLoading || messageState.complete}
                                        onChange={(event) => {
                                            this.setState({
                                                smartContractAddress: event.target.value
                                            });
                                        }}
                                    />
                                </Form.Field>
                            );
                        }}
                    />
                </MetamaskProvider>
            </Fragment>
        );
    }
}

export default SmartContractData;