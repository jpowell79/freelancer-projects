import React, {Component, Fragment} from 'react';
import SubscriptionForm from "../forms/SubscriptionForm";
import {Form} from 'semantic-ui-react';

class AddContract extends Component {
    handleSubmit = (subscriptionForm) => {
        console.log(subscriptionForm);
    };

    render(){
        return (
            <Fragment>
                <h2>New Table Subscription Entry</h2>
                <SubscriptionForm
                    onSubmit={this.handleSubmit}
                    topChildren={
                        <Form.Field>
                            <p className="field-text">Wallet Address should go here.</p>
                        </Form.Field>
                    }
                >
                    <Form.Field>
                        <label>Smart Contract Address</label>
                        <input
                            type="text"
                        />
                    </Form.Field>
                </SubscriptionForm>
            </Fragment>
        );
    }
}

export default AddContract;