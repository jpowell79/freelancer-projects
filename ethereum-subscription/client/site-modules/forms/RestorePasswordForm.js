import React, {Component, Fragment} from "react";
import FormList from "../../containers/FormList";
import {LoaderTiny} from "../../modules/icons";
import withMessage from "../../hocs/withMessage";
import users from "../../../services/api/users";
import {getErrorString} from "../../services/utils";

class RestorePasswordForm extends Component {
    static fields = [{
        type: "password",
        label: "Password:"
    }, {
        type: "confirmPassword",
        label: "Confirm Password:"
    }];

    handleSubmit = ({password, confirmPassword}) => {
        if(password !== confirmPassword){
            RestorePasswordForm.fields[1].error = "The passwords does not match.";
            this.setState({});
            return;
        }

        return this.props.setClearedMessageState({isLoading: true})
            .then(() => users.restorePassword({password}))
            .then(() => this.props.onComplete())
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
                {this.props.renderMessages()}
                <FormList
                    onSubmit={this.handleSubmit}
                    disabled={this.props.messageState.isLoading || this.props.messageState.complete}
                    fields={RestorePasswordForm.fields}
                    submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Restore password"}
                    buttonChildren={this.props.children}
                />
            </Fragment>
        );
    }
}

export default withMessage(RestorePasswordForm);