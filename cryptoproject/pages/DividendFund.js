import React, {Component} from 'react';
import Page from '../components/containers/Page';
import DividendFundTable from '../components/dividend/DividendFundTable';
import DividendInfo from '../components/dividend/DividendInfo';
import Faq from '../components/dividend/Faq';
import UserInfoTable from '../components/tables/UserInfoTable';
import {
    titledSegmentContent,
    titledSegmentHeader
} from "../services/cssUtils/";

class DividendFund extends Component {
    render(){
        return(
            <Page fetchMarketData={false} addTimer={false} contentClass="wrapper">
                <h2 className={titledSegmentHeader()}>
                    Dividend Fund
                </h2>
                <div className={titledSegmentContent()}>
                    <div className="wrapper-2">
                        <h2 className={titledSegmentHeader()}>
                            Your dividend:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <DividendFundTable/>
                        </div>
                        <h2 className={titledSegmentHeader()}>
                            Trader Info:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <UserInfoTable/>
                        </div>
                        <h2 className={titledSegmentHeader()}>
                            Dividend Info:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <DividendInfo/>
                        </div>
                        <h2 className={titledSegmentHeader()}>
                            Faq:
                        </h2>
                        <div className={titledSegmentContent()}>
                            <div className="wrapper-4">
                                <Faq/>
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default DividendFund;