import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import LoginForm from '../site-modules/forms/LoginForm';

class Login extends Component {
    render () {
        return (
            <Page>
                <FullWidthSegment wrapper={4}>
                    <h1>Login</h1>
                    <LoginForm/>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Login;