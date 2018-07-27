import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';
import Dispatcher from '../services/Dispatcher';

class Index extends Component {
    static async getInitialProps({reduxStore, req}){
        const dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.dispatchLoadSettings({request: req});

        return {};
    }

    render () {
        return (
            <Page>
                <FullWidthSegment options={['secondary', 'centered', 'color-white']}>
                    <h1>Ethereum Subscription</h1>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Index;