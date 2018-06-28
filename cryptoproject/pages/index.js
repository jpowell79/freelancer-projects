import React, {Component} from 'react';
import Page from '../components/containers/Page';
import CoinMarketTable from '../components/tables/CoinMarketTable';
import UserInfoTable from '../components/tables/UserInfoTable';
import TradingInfoTable from '../components/tables/TradingInfoTable';
import {
    titledSegmentHeader,
    titledSegmentContent,
    twoColumnGrid
} from "../services/cssUtils";

class Index extends Component {
    render () {
        return (
            <Page fetchMarketData={true} addTimer={true}>
                <div className="wrapper divider-2">
                    <div className="ui two column stackable grid">
                        <div className="column">
                            <h2 className={titledSegmentHeader()}>
                                Your account:
                            </h2>
                            <div className={titledSegmentContent()}>
                                <UserInfoTable tableClass="stacked-table"/>
                            </div>
                        </div>
                        <div className="column">
                            <h2 className={titledSegmentHeader()}>
                                Trading info:
                            </h2>
                            <div className={titledSegmentContent()}>
                                <TradingInfoTable tableClass="stacked-table"/>
                            </div>
                        </div>
                    </div>
                </div>
                <CoinMarketTable/>
            </Page>
        )
    }
}

export default Index;