import React, {Component, Fragment} from "react";
import {Message} from 'semantic-ui-react';
import validation from "../../services/validation";
import {isDefined} from "../../services/strings";

const defaultInitialState = {
    successTitle: 'Your changes have been saved successfully!',
    errorTitle: 'There was some errors with your submission',
    errors: [],
    fieldsWithErrors: [],
    success: [],
    showSuccess: false,
    showError: false
};

export default (Module, initialState) => {
    class MessageProvider extends Component {
        constructor(props){
            super(props);

            this.state = Object.assign({}, defaultInitialState, initialState);
        }

        setMessageState = (state) => {
            this.setState((prevState) => Object.assign({}, prevState, state));
        };

        hasFieldErrors = (additionalFields = {}) => {
            const fields = Object.assign({}, this.state, additionalFields);
            const errors = Object.keys(fields)
                .map(key => validation.getFieldError(key, fields[key]))
                .filter(error => isDefined(error));
            const fieldsWithErrors = Object.keys(fields)
                .filter(key => isDefined(validation.getFieldError(key, fields[key])));

            if(errors.length > 0){
                this.setState({
                    errors,
                    fieldsWithErrors
                });
                return true;
            }

            return false;
        };

        setIsLoading = (state = {}) => {
            this.setState({
                isLoading: true,
                errors: [],
                fieldsWithErrors: [],
                ...state
            });
        };

        setComplete = (state = {}) => {
            this.setState({
                isLoading: false,
                complete: true,
                showSuccess: true,
                ...state
            });
        };

        renderMessages = () => {
            return (
                <Fragment>
                    {(this.state.success.length > 0 || this.state.showSuccess) && (
                        <Message
                            success
                            header={this.state.successTitle}
                            {...(this.state.success.length > 0 ? {list: this.state.success} : {})}
                        />
                    )}
                    {(this.state.errors.length > 0 || this.state.showError) && (
                        <Message
                            error
                            header={this.state.errorTitle}
                            {...(this.state.errors.length > 0 ? {list: this.state.errors} : {})}
                        />
                    )}
                </Fragment>
            );
        };

        render() {
            return (
                <Module
                    {...this.props}
                    renderMessages={this.renderMessages}
                    setMessageState={this.setMessageState}
                    messageState={this.state}
                    hasFieldErrors={this.hasFieldErrors}
                    setIsLoading={this.setIsLoading}
                    setComplete={this.setComplete}
                />
            );
        }
    }

    return MessageProvider;
}