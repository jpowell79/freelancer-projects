import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import {loadServerDataIntoStore} from "../services/loadServerDataIntoStore";

class Index extends Component {
    static async getInitialProps({reduxStore, req}){
        await loadServerDataIntoStore(reduxStore, req, {
            settings: true,
            user: true
        });

        return {};
    }

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

export default Index;