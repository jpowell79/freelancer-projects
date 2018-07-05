import React, {Component} from 'react';
import {connect} from 'react-redux';
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";
import Countdown from 'react-countdown-now';
import Strings from "../../../../services/Strings";
import {LoaderSmall} from "../../../modules/icons";
import {claimDividend} from '../../../../server/services/contract';
import HideFragment from '../../../modules/HideFragment';

class DividendClaimWindow extends Component {
    constructor(props){
        super(props);

        this.state = {
            isClaimingDividend: false,
            dividendClaimed: false,
            claimButtonIsEnabled: true
        };

        this.canMakeClaim = this.canMakeClaim.bind(this);
        this.claimDividend = this.claimDividend.bind(this);
    }

    canMakeClaim(){
        const {
            dividend,
            account
        } = this.props;

        const claimWindowIsOpen = dividend.claimWindowIsOpen;
        const tokenSupplyExists = dividend.totalTokenSupply > 0;
        const hasTradeTokens = account.tradeTokens > 0;

        return claimWindowIsOpen &&
            tokenSupplyExists &&
            hasTradeTokens;
    }

    claimDividend(){
        this.setState({
            isClaimingDividend: true,
            claimButtonIsEnabled: false
        });

        claimDividend().then(response => {
            console.log(response);
            this.setState({
                isClaimingDividend: false,
                dividendClaimed: true
            });
        });
    }

    render(){
        const {
            account,
            dividend
        } = this.props;

        if(account.isLoading || dividend.isLoading) return null;
        if(!Strings.isDefined(dividend.address)) return null;
        if(!Strings.isDefined(account.address)) return null;

        const now = Date.now();
        const time = (dividend.closeTime > now)
            ? dividend.closeTime : dividend.openTime;
        const claimWindowText = (dividend.closeTime > now)
            ? "The claim window will close in" : "The claim window will open in";

        //TODO: What happens when a time expires?

        return (
            <div id="dividend-claim-window">
                <h2 className="no-margin-bottom">The dividend fund claim window is currently</h2>
                <h3 className="capitalized">{
                    (dividend.claimWindowIsOpen) ? "OPEN" : "CLOSED"
                }</h3>
                <h2>{claimWindowText}</h2>
                <HideFragment>
                    <Countdown
                        date={time}
                        onComplete={() => {}}
                        renderer={CryptoCountdown.countdownRenderer}
                    />
                </HideFragment>
                {(this.canMakeClaim())
                    ? (
                        <React.Fragment>
                            <h2>Click the claim button to claim your dividend</h2>
                            {(this.state.claimButtonIsEnabled) ? (
                                    <button
                                        className="ui huge primary button"
                                        onClick={this.claimDividend}>Claim</button>
                                )
                                : (
                                    <button
                                        disabled
                                        className="ui huge primary button"
                                        onClick={this.claimDividend}>Claim</button>
                                )
                            }
                        </React.Fragment>
                    ) : null}
                {this.state.isClaimingDividend && (
                    <div className="ui icon info message wrapper-4" style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "2em"
                    }}>
                        <div>
                            <LoaderSmall/>
                        </div>
                        <div className="content">
                            <div className="header text-left">Waiting for transaction to be completed...</div>
                        </div>
                    </div>
                )}
                {this.state.dividendClaimed && (
                    <div className="ui success message wrapper-4" style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "2em"
                    }}>
                        <div className="header">Your dividend share was successfully claimed!</div>
                    </div>
                )}
            </div>
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

export default connect(mapStateToProps)(DividendClaimWindow);