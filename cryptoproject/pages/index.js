import React, {Component} from 'react';
import Page from '../components/Page';
import {connect} from 'react-redux';
import CoinMarketTable from '../components/CoinMarket/CoinMarketTable';

class Index extends Component {
    render () {
        return (
            <Page fetchMarketData={true} addTimer={true}>
                <CoinMarketTable/>
            </Page>
        )
    }
}

export default connect()(Index);