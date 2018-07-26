import React, {Component} from 'react';
import Page from '../containers/Page';
import FullWidthSegment from '../containers/FullWidthSegment';

class About extends Component {
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

export default About;