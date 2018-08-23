import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import withMetamaskAccount from '../../hocs/withMetamaskAccount';
import PropTypes from 'prop-types';
import {LoaderTiny} from "../../modules/icons";
import AlertOptionPane from "../../services/Alert/AlertOptionPane";

class EditSubscriptionForm extends Component {
    static defaultLabels = {
        email: 'Supplier Email:',
        username: 'Username:',
        password: 'Password:',
        duration: 'Duration (in days):',
        other: 'Other info:'
    };

    static defaultProps = {
        title: 'Edit Subscription',
        labels: EditSubscriptionForm.defaultLabels,
        activateButtonText: "Activate"
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
                    type: 'email',
                    label: parsedLabels.email
                },
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
                    label: parsedLabels.duration
                },
                {
                    type: 'other',
                    label: parsedLabels.other
                }
            ]
        };
    }

    state = {
        fields: [],
        isLoading: false
    };

    render(){
        return (
            <Fragment>
                <h2>{this.props.title}</h2>
                <FormList
                    onSubmit={(state) => {
                        this.setState({isLoading: true}, () => {
                            this.props.onSubmit(
                                Object.assign({}, state, this.props)
                            ).then(res => {
                                console.log(res);

                                this.setState({isLoading: false});

                                AlertOptionPane.showSuccessAlert({
                                    message: 'The subscription was edited successfully!'
                                });
                            }).catch(err => {
                                console.error(err);
                                this.setState({isLoading: false});

                                AlertOptionPane.showErrorAlert({
                                    message: err.toString()
                                });
                            });
                        });
                    }}
                    disabled={this.state.isLoading}
                    fields={this.state.fields}
                    submitButtonHtml={
                        (this.state.isLoading)
                            ? <LoaderTiny/>
                            : "Submit"
                    }
                    buttonChildren={
                        (this.props.showActivate && !this.state.isLoading) ? (
                            <button
                                className="ui bg-color-uiBlue color-white button"
                                style={{
                                    marginLeft: "15px"
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState({isLoading: true}, () => {
                                        this.props.onActivate(this.props)
                                            .then(res => {
                                                console.log(res);

                                                this.setState({isLoading: false});

                                                AlertOptionPane.showSuccessAlert({
                                                    message: 'The subscription was activated successfully!'
                                                });
                                            }).catch(err => {
                                                console.error(err);

                                                this.setState({isLoading: false});

                                                AlertOptionPane.showErrorAlert({
                                                    message: err.toString()
                                                });
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

export default withMetamaskAccount(EditSubscriptionForm);