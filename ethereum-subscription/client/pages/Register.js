import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import RegisterForm from '../site-modules/forms/RegisterForm';
import MetamaskContainer from '../containers/MetamaskContainer';

class Register extends Component {
    renderMetamaskAccountNotFound = () => {
        return <h3>You need metamask in order to create an account.</h3>;
    };

    render () {
        return (
            <Page>
                <FullWidthSegment wrapper={4}>
                    <h1>Register</h1>
                    <MetamaskContainer notFoundRenderer={this.renderMetamaskAccountNotFound}>
                        <RegisterForm/>
                    </MetamaskContainer>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Register;