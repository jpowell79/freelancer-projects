import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import withAuthenticate from '../config/withAuthenticate';

class Admin extends Component {
    render () {
        return (
            <Page>
                <FullWidthSegment>
                    <h1>Ethereum Subscription</h1>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default withAuthenticate(Admin);