import React, {Component, Fragment} from 'react';
import {Form, Dropdown, Radio} from 'semantic-ui-react';
import withMessage from '../../config/withMessage';
import PropTypes from 'prop-types';

class SubscriptionForm extends Component {
    static defaultProps = {
        submitButtonText: "Submit",
        topChildren: null
    };

    static propTypes = {
        submitButtonText: PropTypes.string.isRequired,
        onSubmit: PropTypes.func,
        topChildren: PropTypes.element
    };

    render(){
        const {
            setMessageState,
            messageState,
            renderMessages
        } = this.props;

        return (
            <Fragment>
                {renderMessages()}
                <Form>
                    {this.props.topChildren}
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
                    {this.props.children}
                    <hr className="ui divider"/>
                    <button
                        className="ui primary button"
                        onClick={(event) => {
                            event.preventDefault();
                            this.props.onSubmit(this);
                        }}>
                        {this.props.submitButtonText}
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default withMessage((SubscriptionForm), {
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