import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import RegisterForm from '../site-modules/forms/RegisterForm';
import {Segment} from 'semantic-ui-react';

class Register extends Component {
    render () {
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={4}>
                    <Segment padded>
                        <h1>Register</h1>
                        <RegisterForm/>
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Register;