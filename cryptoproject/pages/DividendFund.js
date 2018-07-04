import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page';
import DividendInfo from '../components/pages/dividend-fund/DividendInfo';
import Faq from '../components/pages/dividend-fund/Faq';
import AccountDetails from '../components/pages/trading/AccountDetails';
import {PageTitle} from "../components/modules/PageTitle";
import Paths from "../services/Paths";
import DividendClaimWindow from "../components/pages/dividend-fund/DividendClaimWindow";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import Dispatcher from "../services/Dispatcher";
import {Loader} from "../components/modules/icons";
import Strings from "../services/Strings";

class DividendFund extends Component {
    componentDidMount() {
        new Dispatcher(this.props.dispatch).updateDividendFund();
    }

    render() {
        const {
            dividend,
            account
        } = this.props;

        const {
            bordered,
            centered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page>
                <PageTitle title="Dividend Fund"/>
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <div className="ui padded segment">
                        <h2>Account Details</h2>
                        <AccountDetails/>
                    </div>
                </FullWidthSegment>
                {(dividend.isLoading || account.isLoading)
                    ? (
                        <FullWidthSegment options={[centered]} wrapper={2}>
                            <Loader/>
                        </FullWidthSegment>
                    ) : (Strings.isDefined(dividend.address) && Strings.isDefined(account.address))
                        ? (
                        [
                            <FullWidthSegment key={1} options={[centered]} wrapper={2}>
                                <h2 className="no-margin-bottom">The dividend smart contract address is</h2>
                                <h2 className="capitalized h2" style={{wordBreak: "break-all"}}><a
                                    href={Paths.getEtherScanUrl(dividend.address)}>{
                                    dividend.address
                                }</a></h2>
                            </FullWidthSegment>,
                            <FullWidthSegment key={2} options={[gray, bordered]} wrapper={2}>
                                <div className="ui padded segment">
                                    <DividendInfo/>
                                </div>
                            </FullWidthSegment>,
                            <FullWidthSegment key={3} options={[centered]} wrapper={2}>
                                <DividendClaimWindow/>
                            </FullWidthSegment>
                        ]
                        ) : (
                            <FullWidthSegment key={3} options={[centered]} wrapper={2}>
                                <p className="h2">Error: Unable to load dividend information.</p>
                            </FullWidthSegment>
                        )}
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <h2 className="title centered">FAQ</h2>
                    <Faq/>
                </FullWidthSegment>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        dividend,
        account
    } = state;

    return {
        dividend,
        account
    };
};

export default connect(mapStateToProps)(DividendFund);