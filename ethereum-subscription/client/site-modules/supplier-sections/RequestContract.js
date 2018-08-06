import React, {Component} from 'react';
import ProviderCalculator from "../ProviderCalculator";
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import SubscriptionForm from "../forms/SubscriptionForm";
import axios from "axios/index";
import {mailTypes, urls} from "../../../services/constants";
import validation from "../../../services/validation";
import {isDefined} from "../../../services/strings";

class RequestContract extends Component {
    static mapStateToProps = ({user}) => ({user});

    hasFieldErrors = (subscriptionForm) => {
        const {
            messageState,
            setMessageState,
        } = subscriptionForm.props;

        const errors = Object.keys(messageState)
            .map(key => validation.getFieldError(key, messageState[key]))
            .filter(error => isDefined(error));

        if(errors.length > 0){
            setMessageState({errors});
            return true;
        }

        return false;
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
            messageState,
            setMessageState
        } = subscriptionForm.props;

        setMessageState({
            isLoading: true,
            errors: []
        });

        return axios.post(`${urls.email}/${mailTypes.requestContract}`, messageState)
            .then(() => {
                setMessageState({
                    isLoading: false,
                    complete: true,
                    successTitle: 'Your request has been sent successfully!',
                    success: [`You will receive an email when the admins have processed your request`],
                    showSuccess: true
                });
            })
            .catch(err => {
                setMessageState({
                    isLoading: false,
                    errors: [err.toString()]
                });
            });
    };

    render(){
        const {user} = this.props;

        return (
            <div className="container-4">
                <h2>Provider Calculator</h2>
                <ProviderCalculator/>
                <h2>Request New Contract</h2>
                <SubscriptionForm
                    topChildren={
                        <Form.Field>
                            <label>Your Ethereum Wallet Address</label>
                            <span style={{wordBreak: "break-all"}} className="field-text">
                                {user.walletAddress}
                            </span>
                        </Form.Field>
                    }
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default connect(RequestContract.mapStateToProps)(RequestContract);