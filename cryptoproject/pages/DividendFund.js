import React, {Component} from 'react';
import Page from '../components/containers/Page';
import DividendInfo from '../components/pages/dividend-fund/DividendInfo';
import Faq from '../components/pages/dividend-fund/Faq';
import AccountDetails from '../components/pages/index/AccountDetails';
import {PageTitle} from "../components/containers/PageTitle";
import Paths from "../services/Paths";
import DividendClaimWindow from "../components/pages/dividend-fund/DividendClaimWindow";
import FullWidthSegment from "../components/containers/FullWidthSegment";

const TEMP_DIVIDEND = '0x0baebf4d24adb328a9a5f62c09a0ba108761dede';

class DividendFund extends Component {
    render(){
        const {
            bordered,
            centered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return(
            <Page>
                <PageTitle title="Dividend Fund"/>
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <div className="ui padded segment">
                        <h2>Account Details</h2>
                        <AccountDetails/>
                    </div>
                </FullWidthSegment>
                <FullWidthSegment options={[centered]} wrapper={2}>
                    <h2 className="no-margin-bottom">The dividend smart contract address is</h2>
                    <h2 className="capitalized h2" style={{wordBreak: "break-all"}}><a
                        href={Paths.getEtherScanUrl(TEMP_DIVIDEND)}>{
                        TEMP_DIVIDEND
                    }</a></h2>
                </FullWidthSegment>
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <div className="ui padded segment">
                        <DividendInfo/>
                    </div>
                </FullWidthSegment>
                <FullWidthSegment options={[centered]}>
                    <DividendClaimWindow/>
                </FullWidthSegment>
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <h2 className="title centered">FAQ</h2>
                    <Faq/>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default DividendFund;