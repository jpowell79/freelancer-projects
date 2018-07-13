import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page';
import TokenHolderClaimInfo from '../components/pages/token-holder-claim-info/TokenHolderClaimInfo';
import UserClaimInfo from '../components/pages/token-holder-claim-info/UserClaimInfo';
import EntitlementSearch from '../components/pages/token-holder-claim-info/EntitlementSearch';
import Faq from '../components/pages/token-holder-claim-info/Faq';
import AccountDetails from '../components/pages/trading/AccountDetails';
import {PageTitle} from "../components/modules/PageTitle";
import Paths from "../services/Paths";
import TokenHolderClaimWindow from "../components/pages/token-holder-claim-info/TokenHolderClaimWindow";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import Dispatcher from "../services/Dispatcher";
import Strings from "../services/Strings";
import {joinClassNames} from "../services/utils";

class TokenHolderClaim extends Component {
    static async getInitialProps({reduxStore}){
        let dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.updateTokenHolderClaim();
        return {};
    }

    render() {
        const {
            tokenHolderClaim,
            account
        } = this.props;

        const {
            bordered,
            centered,
            attached
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        const renderClaimWindow = (
            Strings.isDefined(tokenHolderClaim.address)
            && Strings.isDefined(account.address)
        );

        const faqOptions = (renderClaimWindow) ? [gray, bordered] : [bordered];

        return (
            <Page>
                <PageTitle title="Token Holder Claim" className={joinClassNames(bordered, attached)}/>
                <FullWidthSegment options={[gray]} wrapper={2}>
                    <div className="ui padded segment">
                        {(Strings.isDefined(account.address)) && (
                            <h2>Your Account Details</h2>
                        )}
                        <AccountDetails onErrorRenderer={() => {
                            return (
                                <div className="wrapper-3 text-center">
                                    <div className="h4 divider-3 no-margin-top">
                                        <p>
                                            We are unable to retrieve your account details. Please ensure
                                            that you are logged in to Metamask. Alternatively, you can check
                                            the claim entitlement of any address by copying in the address into
                                            the form below:
                                        </p>
                                    </div>
                                    <div className="wrapper-4">
                                        <EntitlementSearch/>
                                    </div>
                                </div>
                            );
                        }}/>
                    </div>
                </FullWidthSegment>
                {(Strings.isDefined(tokenHolderClaim.address)) && (
                    <React.Fragment>
                        <FullWidthSegment options={[centered, bordered]} wrapper={3}>
                            <h2 className="no-margin-bottom">The Token Holder Claim smart contract address is</h2>
                            <h2 className="capitalized h2" style={{wordBreak: "break-all"}}><a
                                href={Paths.getEtherScanAddressUrl(tokenHolderClaim.address)} target="_blank">{
                                tokenHolderClaim.address
                            }</a></h2>
                        </FullWidthSegment>
                        <FullWidthSegment options={[gray]} wrapper={2}>
                            <div className="ui padded segment">
                                <TokenHolderClaimInfo/>
                            </div>
                        </FullWidthSegment>
                    </React.Fragment>
                )}
                {(renderClaimWindow)
                    && (
                        <Fragment>
                            <FullWidthSegment
                                options={[gray, bordered, attached]}
                                className="no-padding-top"
                                wrapper={2}>
                                <div className="ui padded segment">
                                    <div className="wrapper-4">
                                        <UserClaimInfo
                                            accountAddress={account.address}
                                            claimBlock={tokenHolderClaim.claimBlock}
                                            totalEth={tokenHolderClaim.totalTokenSupply}
                                        />
                                    </div>
                                </div>
                            </FullWidthSegment>
                            <FullWidthSegment options={[centered]} wrapper={4}>
                                <TokenHolderClaimWindow/>
                            </FullWidthSegment>
                        </Fragment>
                    )}
                <FullWidthSegment options={faqOptions} wrapper={2}>
                    <h2 className="title centered">FAQ</h2>
                    <Faq/>
                </FullWidthSegment>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        tokenHolderClaim,
        account
    } = state;

    return {
        tokenHolderClaim,
        account
    };
};

export default connect(mapStateToProps)(TokenHolderClaim);