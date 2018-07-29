import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import RegisterForm from '../site-modules/forms/RegisterForm';
import MetamaskContainer from '../containers/MetamaskContainer';
import {Segment} from 'semantic-ui-react';

class Register extends Component {
    renderMetamaskAccountNotFound = () => {
        return <h3>You need metamask in order to create an account.</h3>;
    };

    render () {
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={4}>
                    <Segment padded>
                        <h1>Register</h1>
                        <MetamaskContainer notFoundRenderer={this.renderMetamaskAccountNotFound}>
                            <RegisterForm/>
                        </MetamaskContainer>
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Register;