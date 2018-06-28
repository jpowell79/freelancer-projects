import React, {Component} from 'react';
import Page from '../components/containers/Page';
import DividendFundTable from '../components/dividend/DividendFundTable';
import DividendInfo from '../components/dividend/DividendInfo';
import Faq from '../components/Faq';
import UserInfoTable from '../components/tables/UserInfoTable';
import {
    titledSegmentContent,
    titledSegmentHeader
} from "../services/cssUtils/";

class DividendFund extends Component {
    render(){
        return(
            <Page contentClass="wrapper">
                <h2 className={titledSegmentHeader()}>
                    Dividend Fund
                </h2>
                <div className={titledSegmentContent()}>
                    <div className="ui two column stackable grid">
                        <div className="column">
                            <h2 className={titledSegmentHeader()}>
                                Your dividend:
                            </h2>
                            <div className={titledSegmentContent()}>
                                <DividendFundTable tableClass="stacked-table"/>
                            </div>
                        </div>
                        <div className="column">
                            <h2 className={titledSegmentHeader()}>
                                Dividend Info:
                            </h2>
                            <div className={titledSegmentContent()}>
                                <DividendInfo/>
                            </div>
                        </div>
                        <div className="column">
                            <h2 className={titledSegmentHeader()}>
                                Trader Info:
                            </h2>
                            <div className={titledSegmentContent()}>
                                <UserInfoTable tableClass="stacked-table"/>
                            </div>
                        </div>
                        <div className="column">
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
                </div>
            </Page>
        );
    }
}

export default DividendFund;