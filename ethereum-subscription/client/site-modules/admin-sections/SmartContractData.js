import React, {Component, Fragment} from 'react';
import SubscriptionForm from "../forms/SubscriptionForm";
import {Form} from 'semantic-ui-react';
import SubscriptionContract from '../../../services/smart-contracts/SubscriptionContract';
import withMetamaskAccount from '../../hocs/withMetamaskAccount';
import {LoaderSmall} from "../../modules/icons";
import objects from "../../../services/datatypes/objects";
import {getErrorString} from "../../services/utils";

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
            messageState,
            setMessageState,
            setIsLoading,
            setComplete
        } = subscriptionForm.props;

        const {
            web3,
            metamaskAccount,
        } = this.props;

        setIsLoading();

        return this.setSubscriptionDetails(web3, metamaskAccount, messageState)
            .then(() => {
                setComplete({
                    successTitle: 'The contract has been edited successfully',
                });
            }).catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [getErrorString(err)]
                });
            });
    };

    render(){
        if(this.props.metamaskAccount.isLoading){
            return (
                <Fragment>
                    <LoaderSmall/>
                    <h4 className="text-center">Detecting account changes...</h4>
                </Fragment>
            );
        }

        if(objects.isEmpty(this.props.metamaskAccount)){
            return (
                <p className="text">
                    Login to metamask in order to edit a smart contract.
                </p>
            );
        }

        return (
            <Fragment>
                <h2>Edit Smart Contract Data</h2>
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
                                        if(event.target.value.length <= 42){
                                            this.setState({
                                                supplierWalletAddress: event.target.value
                                            });
                                        }
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
                                        if(event.target.value.length <= 42){
                                            this.setState({
                                                smartContractAddress: event.target.value
                                            });
                                        }
                                    }}
                                />
                            </Form.Field>
                        );
                    }}
                />
            </Fragment>
        );
    }
}

export default withMetamaskAccount(SmartContractData);