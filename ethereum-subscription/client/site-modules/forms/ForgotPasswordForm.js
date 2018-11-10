import React, {Component, Fragment} from "react";
import FormList from "../../containers/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import email from "../../../services/api/email";
import {getErrorString} from "../../services/utils";

class ForgotPasswordForm extends Component {
    static fields = [{
        type: "username",
        label: "Username:"
    }];

    handleSubmit = ({username}) => {
        return this.props.setClearedMessageState({isLoading: true})
            .then(() => email.sendRestorePasswordMail({username}))
            .then(() => {
                return this.props.setMessageState({
                    isLoading: false,
                    showSuccess: true,
                    complete: true,
                    successTitle: "The recovery email has now been sent.",
                });
            })
            .catch(err => {
                console.error(err);
                return this.props.setMessageState({
                    errors: [getErrorString(err)],
                    isLoading: false
                })
            });
    };

    render(){
        return (
            <Fragment>
                <p>
                    Enter your username and we will send you a link to reset your password to
                    the associated email address.
                </p>
                {this.props.renderMessages()}
                <FormList
                    onSubmit={this.handleSubmit}
                    disabled={this.props.messageState.isLoading || this.props.messageState.complete}
                    fields={ForgotPasswordForm.fields}
                    submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Restore password"}
                    buttonChildren={this.props.children}
                />
            </Fragment>
        );
    }
}

export default withMessage(ForgotPasswordForm);