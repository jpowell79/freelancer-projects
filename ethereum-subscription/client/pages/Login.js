import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import LoginForm from '../site-modules/forms/LoginForm';
import MetamaskContainer from '../containers/MetamaskContainer';
import Dispatcher from '../services/Dispatcher';

class Login extends Component {
    static async getInitialProps({reduxStore, req}){
        const dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.dispatchLoadSettings({request: req});

        return {};
    }

    render () {
        return (
            <Page>
                <FullWidthSegment wrapper={4}>
                    <h1>Login</h1>
                    <MetamaskContainer>
                        <LoginForm/>
                    </MetamaskContainer>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Login;