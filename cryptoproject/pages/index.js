import React, {Component} from 'react';
import Page from '../components/containers/Page';
import CoinMarketTable from '../components/pages/index/CoinMarketTable';
import AccountDetails from '../components/pages/index/AccountDetails';
import TradingInfo from '../components/pages/index/TradingInfo';
import FullWidthSegment from "../components/containers/FullWidthSegment";

class Index extends Component {
    render () {
        const {
            skinny,
            noWidthPadding,
            bordered,
            attached
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page fetchMarketData={true} addTimer={true}>
                <FullWidthSegment options={[gray, skinny, attached, bordered]} wrapper={2}>
                    <div className="ui padded segment">
                        <h2>Account Details</h2>
                        <AccountDetails/>
                    </div>
                </FullWidthSegment>
                <TradingInfo/>
                <FullWidthSegment options={[skinny, noWidthPadding]}>
                    <h2 className="centered title">Crypto Table</h2>
                    <CoinMarketTable/>
                </FullWidthSegment>
            </Page>
        )
    }
}

export default Index;