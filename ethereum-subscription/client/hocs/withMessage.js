import React, {Component, Fragment} from "react";
import {Message} from 'semantic-ui-react';
import validation from "../../services/validation";
import {isDefined} from "../../services/strings";
import {getChildProps} from "../services/utils";

const defaultInitialState = {
    successTitle: 'Your changes have been saved successfully!',
    errorTitle: 'There was some errors with your submission',
    infoTitle: '',
    errors: [],
    fieldsWithErrors: [],
    success: [],
    info: [],
    showInfo: false,
    showSuccess: false,
    showError: false
};

export default (Module, initialState) => {
    class MessageProvider extends Component {
        static async getInitialProps (appContext){
            const moduleProps = await getChildProps(Module, appContext);
            return {...moduleProps};
        }

        constructor(props){
            super(props);

            this.state = Object.assign({}, defaultInitialState, initialState);
        }

        promiseSetState = async (stateOrUpdater) => {
            return new Promise(resolve => this.setState(stateOrUpdater, () => resolve()));
        };

        setMessageState = async (state, callback = () => {}) => {
            return this.promiseSetState((prevState) => Object.assign({}, prevState, state), callback);
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

        setIsLoading = async (state = {}) => {
            return this.promiseSetState({
                isLoading: true,
                errors: [],
                success: [],
                fieldsWithErrors: [],
                ...state
            });
        };

        setComplete = async (state = {}) => {
            return this.promiseSetState({
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
                    {(this.state.info.length > 0 || this.state.showInfo) && (
                        <Message
                            info
                            header={this.state.infoTitle}
                            {...(this.state.info.length > 0 ? {list: this.state.info} : {})}
                        />
                    )}
                </Fragment>
            );
        };

        onSubmit = async () => this.child.onSubmit();

        render() {
            return (
                <Module
                    {...this.props}
                    ref={module => {this.child = module}}
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