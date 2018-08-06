import React, {Component} from 'react';
import ProviderCalculator from "../ProviderCalculator";
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import SubscriptionForm from "../forms/SubscriptionForm";
import axios from "axios/index";
import {mailTypes, urls} from "../../../services/constants";

class RequestContract extends Component {
    static mapStateToProps = ({user}) => ({user});

    handleSubmit = (subscriptionForm) => {
        if(subscriptionForm.props.hasFieldErrors()) return;

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