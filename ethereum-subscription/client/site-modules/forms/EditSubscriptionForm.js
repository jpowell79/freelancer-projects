import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import PropTypes from 'prop-types';
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import {getErrorString} from "../../services/utils";
import {getTransactionMessage, waitingForBlockchain} from "../../services/messages";
import {connect} from 'react-redux';
import {compose} from 'redux';

class EditSubscriptionForm extends Component {
    static mapStateToProps = ({settings}) => ({
        etherScanUrl: (settings.etherScanUrl) ? settings.etherScanUrl.value : ''
    });

    static defaultLabels = {
        username: 'Username:',
        password: 'Password:',
        duration: null,
        other: 'Other info:'
    };

    static defaultProps = {
        title: 'Edit Subscription',
        labels: EditSubscriptionForm.defaultLabels,
        activateButtonText: "Start the Subscription"
    };

    static propTypes = {
        title: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onActivate: PropTypes.func.isRequired,
        showActivate: PropTypes.bool,
        labels: PropTypes.object
    };

    static getDerivedStateFromProps(props){
        const parsedLabels = Object.assign({}, EditSubscriptionForm.defaultLabels, props.labels);

        return {
            fields: [
                {
                    type: 'username',
                    label: parsedLabels.username
                },
                {
                    type: 'password',
                    label: parsedLabels.password
                },
                {
                    type: 'duration',
                    label: parsedLabels.duration,
                    hidden: parsedLabels.duration === null,
                    excludeFromValidation: parsedLabels.duration === null
                },
                {
                    type: 'other',
                    label: parsedLabels.other
                }
            ]
        };
    }

    state = {
        fields: []
    };

    render(){
        const {
            messageState,
            renderMessages,
            setClearedMessageState,
            setIsLoading
        } = this.props;

        return (
            <Fragment>
                <h2>{this.props.title}</h2>
                {renderMessages()}
                <FormList
                    onSubmit={(state) => {
                        setIsLoading(waitingForBlockchain)
                            .then(() => this.props.onSubmit(Object.assign({}, state, this.props)))
                            .then(transaction => setClearedMessageState({
                                ...getTransactionMessage(transaction, this.props.etherScanUrl)
                            }))
                            .catch(err => {
                                console.error(err);

                                return this.props.setClearedMessageState({
                                    errors: [err.toString()]
                                });
                            });
                    }}
                    onError={() => setClearedMessageState()}
                    disabled={messageState.isLoading || messageState.complete}
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
                                onClick={(event) => {
                                    event.preventDefault();

                                    setIsLoading()
                                        .then(() => this.props.onActivate(this.props))
                                        .then(() => setClearedMessageState({
                                            success: ['The subscription was activated successfully!'],
                                        }))
                                        .catch(err => {
                                            console.error(err);

                                            return setClearedMessageState({
                                                errors: [getErrorString(err)]
                                            });
                                        });
                                }}
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