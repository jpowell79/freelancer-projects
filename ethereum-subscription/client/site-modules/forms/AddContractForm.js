import React, {Component, Fragment} from "react";
import {Form, Dropdown} from "semantic-ui-react";
import withMessage from "../../hocs/withMessage";
import PropTypes from "prop-types";
import {LoaderTiny} from "../../modules/icons";
import {connect} from "react-redux";
import {UserDropdown} from "../UsersDropdown";
import roles from "../../../services/constants/roles";

class AddContractForm extends Component {
    static mapStateToProps = ({subscriptionTypes, users}) => ({
        users,
        options: subscriptionTypes.map(type => ({
            value: type.id,
            text: type.name
        }))
    });

    static defaultProps = {
        submitButtonText: "Add to panel",
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
            renderMessages
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
                        messageState.fieldsWithErrors.includes("supplierUsername")
                    }>
                        <label>Username of supplier</label>
                        <UserDropdown
                            users={this.props.users.filter(user => user.role === roles.supplier)}
                            value={messageState.supplierUsername}
                            disabled={isLoading || complete}
                            onChange={(event, {value}) => {
                                setMessageState({
                                    supplierUsername: value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes("contractAddress")
                    }>
                        <label>New Contract Address</label>
                        <input
                            type="text"
                            value={messageState.contractAddress}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                if(event.target.value.length <= 42){
                                    setMessageState({
                                        contractAddress: event.target.value
                                    });
                                }
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes("subscriptionName")
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
                        messageState.fieldsWithErrors.includes("subscriptionTypeId")
                    }>
                        <label>Subscription Type</label>
                        <Dropdown
                            selection
                            disabled={isLoading || complete}
                            options={this.props.options}
                            onChange={(event, {value}) => {
                                setMessageState({subscriptionTypeId: value});
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={
                        messageState.fieldsWithErrors.includes("subscriptionDetails")
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

export default withMessage(connect(AddContractForm.mapStateToProps)(AddContractForm), {
    supplierUsername: "",
    contractAddress: "",
    subscriptionName: "",
    subscriptionTypeId: "",
    subscriptionDetails: ""
});