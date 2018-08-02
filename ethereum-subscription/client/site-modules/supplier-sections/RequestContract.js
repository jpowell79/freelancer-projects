import React, {Component} from 'react';
import ProviderCalculator from "../ProviderCalculator";
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import SubscriptionForm from "../forms/SubscriptionForm";

class RequestContract extends Component {
    static mapStateToProps = ({user}) => ({user});

    handleSubmit = (subscriptionForm) => {
        //TODO: Validate Fields
        //TODO: Implement Request logic.
        console.log(subscriptionForm);
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