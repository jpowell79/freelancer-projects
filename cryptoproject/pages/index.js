import React, {Component} from 'react';
import Page from '../components/Page';
import {connect} from 'react-redux';
import CoinMarketTable from '../components/CoinMarket/CoinMarketTable';
import UserInfoTable from '../components/UserInfoTable';
import TradingInfoTable from '../components/TradingInfoTable';
import {
    titledSegmentHeader,
    titledSegmentContent
} from "../components/utils/cssUtils";

class Index extends Component {
    render () {
        return (
            <Page fetchMarketData={true} addTimer={true}>
                <div className={twoColumnGrid('unstack-md')}>
                    <div className="eight wide column">
                        <h2 className={titledSegmentHeader()}>
                            Your account:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <UserInfoTable/>
                        </div>
                    </div>
                    <div className="eight wide column">
                        <h2 className={titledSegmentHeader()}>
                            Trading info:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <TradingInfoTable/>
                        </div>
                    </div>
                </div>
                <UserInfo className={'divider-2'}/>
                <CoinMarketTable/>
            </Page>
        )
    }
}

export default connect()(Index);