import React, {Component, Fragment} from "react";
import FormList from "../../containers/FormList";
import PropTypes from "prop-types";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import {getTransactionMessage, waitingForBlockchain} from "../../services/views/messages";
import {connect} from "react-redux";
import {compose} from "redux";

class EditSubscriptionForm extends Component {
    static mapStateToProps = ({settings}) => ({
        etherScanUrl: (settings.etherScanUrl) ? settings.etherScanUrl.value : ""
    });

    static defaultLabels = {
        username: "Username:",
        password: "Password:",
        duration: null,
        other: "Other info:",
        disabled: false
    };

    static defaultProps = {
        title: "Edit Subscription",
        labels: EditSubscriptionForm.defaultLabels,
        activateButtonText: "Start the Subscription"
    };

    static propTypes = {
        title: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onEdited: PropTypes.func.isRequired,
        onActivate: PropTypes.func.isRequired,
        onActivated: PropTypes.func.isRequired,
        showActivate: PropTypes.bool,
        labels: PropTypes.object,
        disabled: PropTypes.bool,
        defaults: PropTypes.object.isRequired
    };

    static getDerivedStateFromProps(props){
        const parsedLabels = Object.assign({}, EditSubscriptionForm.defaultLabels, props.labels);

        return {
            fields: [
                {
                    type: "username",
                    label: parsedLabels.username,
                    defaultValue: props.defaults.username
                },
                {
                    type: "password",
                    label: parsedLabels.password,
                    defaultValue: props.defaults.password
                },
                {
                    type: "duration",
                    label: parsedLabels.duration,
                    hidden: parsedLabels.duration === null,
                    excludeFromValidation: parsedLabels.duration === null,
                    defaultValue: props.defaults.duration
                },
                {
                    type: "other",
                    label: parsedLabels.other,
                    defaultValue: props.defaults.other
                }
            ]
        };
    }

    state = {
        fields: []
    };

    handleEditSubscription = (state) => {
        const {
            setIsLoading,
            setClearedMessageState
        } = this.props;

        return setIsLoading(waitingForBlockchain)
            .then(() => this.props.onSubmit(Object.assign({}, state, this.props)))
            .then(transaction => setClearedMessageState(
                getTransactionMessage(
                    transaction,
                    this.props.etherScanUrl,
                    "The subscription was edited successfully!"
                )
            ))
            .then(() => this.props.onEdited(this.props))
            .catch(err => {
                console.error(err);

                return this.props.setClearedMessageState({
                    errors: [err.toString()]
                });
            });
    };

    handleActivate = (event) => {
        event.preventDefault();

        const {
            setIsLoading,
            setClearedMessageState
        } = this.props;

        return setIsLoading(waitingForBlockchain)
            .then(() => this.props.onActivate(this.props))
            .then(transaction => setClearedMessageState(
                getTransactionMessage(
                    transaction,
                    this.props.etherScanUrl,
                    "The subscription was activated successfully!"
                )
            ))
            .then(() => this.props.onActivated(this.props))
            .catch(err => {
                console.error(err);

                return setClearedMessageState({
                    errors: [err.toString()]
                });
            });
    };

    render(){
        const {
            messageState,
            renderMessages,
            setClearedMessageState
        } = this.props;

        return (
            <Fragment>
                <h2>{this.props.title}</h2>
                {renderMessages()}
                <FormList
                    onSubmit={this.handleEditSubscription}
                    onError={() => setClearedMessageState()}
                    disabled={messageState.isLoading || messageState.complete || this.props.disabled}
                    fields={this.state.fields}
                    submitButtonHtml={
                        (messageState.isLoading)
                            ? <LoaderTiny/>
                            : "Submit"
                    }
                    buttonChildren={
                        (this.props.showActivate && !messageState.isLoading) ? (
                            <button
                                className="ui bg-color-uiBlue color-white button"
                                style={{marginLeft: "15px"}}
                                disabled={messageState.isLoading}
                                onClick={this.handleActivate}
                            >
                                {this.props.activateButtonText}
                            </button>
                        ) : null
                    }
                />

            </Fragment>
        );
    }
}

export default compose(
    withMessage,
    connect(EditSubscriptionForm.mapStateToProps)
)(EditSubscriptionForm);