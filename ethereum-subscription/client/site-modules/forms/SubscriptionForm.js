import React, {Component, Fragment} from 'react';
import {Form, Dropdown, Radio} from 'semantic-ui-react';
import withMessage from '../../hocs/withMessage';
import PropTypes from 'prop-types';
import {LoaderTiny} from "../../modules/icons";
import {connect} from 'react-redux';

class SubscriptionForm extends Component {
    static mapStateToProps = ({subscriptionTypes}) => ({
        options: subscriptionTypes.map(type => ({
            value: type.id,
            text: type.name
        }))
    });

    static defaultProps = {
        submitButtonText: "Submit",
        renderTopChildren: () => { return null; },
        renderBottomChildren: () => { return null; }
    };

    static propTypes = {
        submitButtonText: PropTypes.string.isRequired,
        onSubmit: PropTypes.func,
        renderTopChildren: PropTypes.func,
        renderBottomChildren: PropTypes.func
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this);
    };

    render(){
        const {
            setMessageState,
            messageState,
            renderMessages,
        } = this.props;

        const {
            isLoading,
            complete
        } = messageState;

        return (
            <Fragment>
                {renderMessages()}
                <Form>
                    {this.props.renderTopChildren(this.props)}
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('contactDetails')
                    }>
                        <label>Contact details (optional - max 50 characters)</label>
                        <span className="counter">
                            {50 - messageState.contactDetails.length}
                        </span>
                        <input
                            disabled={isLoading || complete}
                            type="text"
                            value={messageState.contactDetails}
                            onChange={(event) => {
                                if(event.target.value.length <= 50){
                                    setMessageState({
                                        contactDetails: event.target.value
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('subscriptionType')
                    }>
                        <label>Subscription Type</label>
                        <Dropdown
                            selection
                            disabled={isLoading || complete}
                            options={this.props.options}
                            onChange={(event, {value}) => {
                                setMessageState({
                                    subscriptionType: this.props.options
                                        .filter(option => option.value === value)[0].text
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('subscriptionName')
                    }>
                        <label>Subscription Name</label>
                        <input
                            type="text"
                            value={messageState.subscriptionName}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                if(event.target.value.length <= 64){
                                    setMessageState({
                                        subscriptionName: event.target.value
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('subscriptionLengthInWeeks')
                    }>
                        <label>Subscription Length (in weeks)</label>
                        <input
                            type="number"
                            value={messageState.subscriptionLengthInWeeks}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({
                                    subscriptionLengthInWeeks: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('subscriptionPrice')
                    }>
                        <label>Monthly Subscription Price (in Wei)</label>
                        <input
                            type="number"
                            value={messageState.subscriptionPrice}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({
                                    subscriptionPrice: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('joinFee')
                    }>
                        <label>Joining Fee (in Wei)</label>
                        <input
                            type="number"
                            value={messageState.joinFee}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({joinFee: event.target.value});
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('exitFee')
                    }>
                        <label>Exit Fee (in Wei)</label>
                        <input
                            type="number"
                            value={messageState.exitFee}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({
                                    exitFee: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('hasFreeTrials')
                    }>
                        <label>Free Trials?</label>
                        <Radio
                            label='Yes'
                            checked={messageState.hasFreeTrials}
                            disabled={isLoading || complete}
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
                                disabled={isLoading || complete}
                                onChange={() => {
                                    setMessageState({
                                        hasFreeTrials: false
                                    });
                                }}
                            />
                        </span>
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes('subscriptionDetails')
                    }>
                        <label>Subscription Details (max 2048 characters)</label>
                        <span className="counter">
                            {2048 - messageState.subscriptionDetails.length}
                        </span>
                        <textarea
                            value={messageState.subscriptionDetails}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                if(event.target.value.length <= 2048){
                                    setMessageState({
                                        subscriptionDetails: event.target.value
                                    });
                                }
                            }}
                            rows={6}
                        />
                    </Form.Field>
                    {this.props.renderBottomChildren(this.props)}
                    <hr className="ui divider"/>
                    <button
                        className="ui primary button"
                        onClick={this.handleSubmit}>
                        {(isLoading)
                            ? <LoaderTiny/>
                            : this.props.submitButtonText}
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default withMessage(connect(SubscriptionForm.mapStateToProps)(SubscriptionForm), {
    contactDetails: '',
    subscriptionType: '',
    subscriptionName: '',
    subscriptionLengthInWeeks: '',
    subscriptionPrice: '',
    joinFee: '',
    exitFee: '',
    hasFreeTrials: true,
    subscriptionDetails: '',
    isLoading: false,
    complete: false
});