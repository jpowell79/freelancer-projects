import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import RegisterForm from '../site-modules/forms/RegisterForm';
import MetamaskContainer from '../containers/MetamaskProvider';
import {Segment} from 'semantic-ui-react';
import {isClient} from '../../services/utils';

class Register extends Component {
    renderMetamaskAccountNotFound = () => {
        if(!isClient()) return null;

        if(!window.web3){
            return <p className="text">You need metamask in order to create an account.</p>;
        }

        return <p className="text">Login to metamask in order to create an account.</p>;
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