import React, {Component, Fragment} from "react";
import FormList from "../../containers/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import emailApi from "../../../services/api/email";
import {getErrorString} from "../../services/utils";
import {Checkbox} from "semantic-ui-react";

class ForgotPasswordForm extends Component {
    state = {
        showEmailField: false
    };

    static usernameField = [{
        type: "username",
        label: "Username:"
    }];

    static emailField = [{
        type: "email",
        label: "Email:"
    }];

    handleSubmit = ({username, email}) => {
        return this.props.setClearedMessageState({isLoading: true})
            .then(() => emailApi.sendRestorePasswordMail({username, email}))
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

    toggleShowEmailField = () => this.setState((prevState) => ({
        showEmailField: !prevState.showEmailField
    }));

    render(){
        const {showEmailField} = this.state;

        return (
            <Fragment>
                <p>
                    Enter your username and we will send you a link to reset your password to
                    the associated email address.
                </p>
                {this.props.renderMessages()}
                <div key={this.state.showEmailField}>
                    <FormList
                        onSubmit={this.handleSubmit}
                        disabled={this.props.messageState.isLoading || this.props.messageState.complete}
                        fields={(showEmailField) ? ForgotPasswordForm.emailField : ForgotPasswordForm.usernameField}
                        submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Restore password"}
                        buttonChildren={this.props.children}
                    >
                        <Checkbox
                            label='I want to enter my email instead'
                            checked={this.state.showEmailField}
                            onChange={this.toggleShowEmailField}
                        />
                    </FormList>
                </div>
            </Fragment>
        );
    }
}

export default withMessage(ForgotPasswordForm);