import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import RegisterForm from '../site-modules/forms/RegisterForm';

class Register extends Component {
    render () {
        return (
            <Page>
                <FullWidthSegment wrapper={4}>
                    <h1>Register</h1>
                    <RegisterForm/>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Register;