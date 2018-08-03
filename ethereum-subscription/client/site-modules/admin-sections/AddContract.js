import React, {Component, Fragment} from 'react';
import SubscriptionForm from "../forms/SubscriptionForm";
import {Form} from 'semantic-ui-react';
import MetamaskProvider from "../../containers/MetamaskProvider";
import SubscriptionContract from '../../../services/smart-contracts/SubscriptionContract';
import validation from '../../../services/validation';
import {isDefined} from '../../../services/strings';
import {mailTypes, urls} from '../../../services/constants';
import axios from 'axios';

class AddContract extends Component {
    state = {
        supplierWalletAddress: '',
        smartContractAddress: '',
    };

    hasFieldErrors = (subscriptionForm) => {
        const {
            messageState,
            setMessageState,
        } = subscriptionForm.props;

        const fields = Object.assign({}, messageState, this.state);
        const errors = Object.keys(fields)
            .map(key => validation.getFieldError(key, fields[key]))
            .filter(error => isDefined(error));

        if(errors.length > 0){
            setMessageState({errors});
            return true;
        }

        return false;
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

        //TODO: Send email to contactDetails

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

    sendContractCreatedEmail = async (setMessageState, {contactDetails, subscriptionName}) => {
        return axios.post(`${urls.email}/${mailTypes.contractCreated}`, {
            contactDetails,
            subscriptionName,
        });
    };

    handleSubmit = (subscriptionForm) => {
        if(this.hasFieldErrors(subscriptionForm)) return;

        const {
            web3,
            metamaskAccount,
            messageState,
            setMessageState
        } = subscriptionForm.props;

        setMessageState({isLoading: true});

        return this.setSubscriptionDetails(web3, metamaskAccount, messageState)
            .then(() => this.sendContractCreatedEmail(setMessageState, messageState))
            .then(() => {
                setMessageState({
                    isLoading: false,
                    complete: true,
                    successTitle: 'The contract has been created successfully',
                    success: [`An email has been sent to ${messageState.contactDetails}`],
                    showSuccess: true,
                    errors: []
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
                <h2>New Table Subscription Entry</h2>
                <MetamaskProvider notFoundRenderer={() =>
                    <p className="text">Login to metamask in order to add a new contract.</p>
                }>
                    <SubscriptionForm
                        onSubmit={this.handleSubmit}
                        renderTopChildren={({messageState}) => {
                            return (
                                <Form.Field>
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
                                <Form.Field>
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

export default AddContract;