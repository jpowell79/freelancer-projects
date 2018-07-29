import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import LoginForm from '../site-modules/forms/LoginForm';
import {Message, Segment} from 'semantic-ui-react';

class Login extends Component {
    static async getInitialProps({res, req}){
        if(req && req.session){
            return {userWasActivated: req.session.userWasActivated}
        }

        return {};
    }

    render () {
        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={4}>
                    <Segment padded>
                        {(this.props.userWasActivated) && (
                            <Message
                                success
                                header='Your account has been activated successfully.'
                            />
                        )}
                        <h1>Login</h1>
                        <LoginForm/>
                    </Segment>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Login;