import React, {Component, Fragment} from "react";
import FormList from "../../containers/FormList";
import paths, {redirect} from "../../../services/constants/paths";
import {connect} from "react-redux";
import {LoaderTiny} from "../../modules/icons";
import roles from "../../../services/constants/roles";
import withMessage from "../../hocs/withMessage";
import {getErrorString} from "../../services/utils";
import sessions from "../../../services/api/sessions";

class LoginForm extends Component {
    static fields = [
        {
            type: "username",
            label: "Username:"
        },
        {
            type: "password",
            label: "Password:"
        }
    ];

    handleSubmit = ({username, password}) => {
        this.props.setMessageState({
            errors: [],
            isLoading: true
        });

        sessions.login({username, password})
            .then(res => {
                if(res.data.role === roles.admin){
                    redirect(paths.pages.admin);
                } else {
                    redirect(paths.pages.supplier);
                }
            })
            .catch(err => {
                this.props.setMessageState({
                    errors: [getErrorString(err)],
                    isLoading: false
                });
            });
    };

    render(){
        return (
            <Fragment>
                {this.props.renderMessages()}
                <FormList
                    validate={false}
                    onSubmit={this.handleSubmit}
                    disabled={this.props.messageState.isLoading}
                    fields={LoginForm.fields}
                    submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Login"}
                />
            </Fragment>
        );
    }
}

export default withMessage(connect()(LoginForm));