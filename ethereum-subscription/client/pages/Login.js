import React, {Component, Fragment} from "react";
import Page from "../containers/Page";
import FullWidthSegment from "../containers/FullWidthSegment";
import LoginForm from "../site-modules/forms/LoginForm";
import {Message, Segment} from "semantic-ui-react";
import ForgotPasswordForm from "../site-modules/forms/ForgotPasswordForm";
import RestorePasswordForm from "../site-modules/forms/RestorePasswordForm";

class Login extends Component {
    state = {
        renderForgotPassword: false,
        hasRestoredPassword: false
    };

    static async getInitialProps({res, req}){
        if(req && req.session){
            return {
                userWasActivated: req.session.userWasActivated,
                restorePassword: req.session.restorePassword
            }
        }

        return {};
    }

    renderForm = () => {
        if(this.props.restorePassword && !this.state.hasRestoredPassword){
            return (
                <Fragment>
                    <h2>Restore your password</h2>
                    <RestorePasswordForm
                        onComplete={() => this.setState({hasRestoredPassword: true})}
                    />
                </Fragment>
            );
        } else if(this.state.renderForgotPassword){
            return (
                <Fragment>
                    <h2>Forgot your password?</h2>
                    <ForgotPasswordForm>
                        <button
                            className="ui button"
                            onClick={() => this.setState({renderForgotPassword: false})}
                        >Cancel</button>
                    </ForgotPasswordForm>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <h1>Login</h1>
                <LoginForm
                    onForgotPassword={() =>
                        this.setState({renderForgotPassword: true})
                    }
                />
            </Fragment>
        );
    };

    renderMessage = () => {
        if(this.state.hasRestoredPassword){
            return (
                <Message
                    success
                    header="Your password was changed successfully."
                />
            );
        } else if(this.props.userWasActivated){
            return (
                <Message
                    success
                    header="Your account has been activated successfully."
                />
            );
        }

        return null;
    };

    render () {
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={4}>
                    <Segment padded>
                        {this.renderMessage()}
                        {this.renderForm()}
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Login;