import React, {Component} from 'react';
import ProviderCalculator from "../ProviderCalculator";
import {Form, Dropdown, Radio} from 'semantic-ui-react';
import withMessage from '../../config/withMessage';
import {connect} from 'react-redux';

class RequestContract extends Component {
    static mapStateToProps = ({user}) => ({user});

    handleSubmit = () => {
        const {
            user,
            setMessageState,
            messageState,
            renderMessages
        } = this.props;

        //TODO: Validate Fields
        //TODO: Implement Request logic.
        console.log(messageState);
    };

    render(){
        const {
            user,
            setMessageState,
            messageState,
            renderMessages
        } = this.props;

        return (
            <div className="container-4">
                <h2>Provider Calculator</h2>
                <ProviderCalculator/>
                <h2>Request New Contract</h2>
                {renderMessages()}
                <Form className="h3">
                    <Form.Field>
                        <label>Your Wallet Address:</label>
                        <span style={{wordBreak: "break-all"}}>
                            {user.walletAddress}
                        </span>
                    </Form.Field>
                    <Form.Field>
                        <label>Contact details (optional - max 50 characters)</label>
                        <input
                            type="text"
                            value={messageState.contactDetails}
                            onChange={(event) => {
                                setMessageState({
                                    contactDetails: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Subscription Type</label>
                        <Dropdown
                            selection
                            defaultValue="Gym Membership"
                            options={[
                                {
                                    text: "Gym Membership",
                                    value: "Gym Membership"
                                },
                                {
                                    text: 'Another Subscription Type',
                                    value: 'Another Subscription Type',
                                }
                            ]}
                            onChange={(event, {value}) => {
                                setMessageState({subscriptionType: value});
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Subscription Name</label>
                        <input
                            type="text"
                            value={messageState.subscriptionName}
                            onChange={(event) => {
                                setMessageState({
                                    subscriptionName: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Subscription Length (in weeks)</label>
                        <input
                            type="text"
                            value={messageState.subscriptionLength}
                            onChange={(event) => {
                                setMessageState({
                                    subscriptionLength: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Monthly Subscription Price (in Wei)</label>
                        <input
                            type="text"
                            value={messageState.monthlySubscriptionPrice}
                            onChange={(event) => {
                                setMessageState({
                                    monthlySubscriptionPrice: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Joining Fee (in Wei)</label>
                        <input
                            type="text"
                            value={messageState.joiningFee}
                            onChange={(event) => {
                                setMessageState({joiningFee: event.target.value});
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Exit Fee (in Wei)</label>
                        <input
                            type="text"
                            value={messageState.exitFee}
                            onChange={(event) => {
                                setMessageState({
                                    exitFee: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Free Trials?</label>
                        <Radio
                            label='Yes'
                            checked={messageState.hasFreeTrials}
                            onChange={() => {
                                setMessageState({
                                    hasFreeTrials: true
                                });
                            }}
                        />
                        <span className="padder-3">
                            <Radio
                                label='No'
                                checked={!messageState.hasFreeTrials}
                                onChange={() => {
                                    setMessageState({
                                        hasFreeTrials: false
                                    });
                                }}
                            />
                        </span>
                    </Form.Field>
                    <Form.Field>
                        <label>Subscription Details (max 500 characters)</label>
                        <textarea
                            value={messageState.subscriptionDetails}
                            onChange={(event) => {
                                setMessageState({
                                    subscriptionDetails: event.target.value
                                });
                            }}
                            rows={6}
                        />
                    </Form.Field>
                    <hr className="ui divider"/>
                    <button
                        className="ui primary button"
                        onClick={this.handleSubmit}>
                        Submit
                    </button>
                </Form>
            </div>
        );
    }
}

export default withMessage(connect(RequestContract.mapStateToProps)(RequestContract), {
    contactDetails: '',
    subscriptionType: '',
    subscriptionName: '',
    subscriptionLength: '',
    monthlySubscriptionPrice: '',
    joiningFee: '',
    exitFee: '',
    hasFreeTrials: true,
    subscriptionDetails: ''
});