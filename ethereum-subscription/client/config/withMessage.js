import React, {Component, Fragment} from "react";
import {Message} from 'semantic-ui-react';

const defaultInitialState = {
    successTitle: 'Your changes have been saved successfully!',
    errorTitle: 'There was some errors with your submission',
    errors: [],
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
                />
            );
        }
    }

    return MessageProvider;
}