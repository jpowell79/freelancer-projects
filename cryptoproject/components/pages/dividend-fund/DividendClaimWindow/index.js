import React, {Component} from 'react';
import {connect} from 'react-redux';
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";
import Countdown from 'react-countdown-now';
import Strings from "../../../../services/Strings";
import {LoaderSmall} from "../../../modules/icons";
import {claimDividend} from '../../../../server/services/contract';
import HideFragment from '../../../modules/HideFragment';

class DividendClaimWindow extends Component {
    static claimStatus = {
        idle: "idle",
        inProgress: "inProgress",
        success: "success",
        error: "error"
    };

    constructor(props){
        super(props);

        this.state = {
            claimStatus: DividendClaimWindow.claimStatus.idle,
            claimButtonIsEnabled: true
        };

        this.canMakeClaim = this.canMakeClaim.bind(this);
        this.claimDividend = this.claimDividend.bind(this);
        this.renderClaimStatusMessage = this.renderClaimStatusMessage.bind(this);
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
        const {
            inProgress,
            success,
            error
        } = DividendClaimWindow.claimStatus;


        this.setState({
            claimStatus: inProgress,
            claimButtonIsEnabled: false
        });

        return claimDividend(this.props.account.address)
            .then(response => {
                console.log(response);
                
                this.setState({
                    claimStatus: success
                });
            }).catch((err, more) => {
                console.error(err);

                const errorString = err.toString();

                if(errorString.includes('out of gas')){
                    this.errorMessage = 'The transaction ran out of gas.';
                } else if(errorString.includes('User denied')){
                    this.errorMessage = '';
                } else if(errorString.includes('gas is too low')) {
                    this.errorMessage = 'The transaction gas is too low.';
                } else {
                    this.errorMessage = 'Something went wrong with the transaction.';
                }

                this.setState({
                    claimStatus: error,
                    claimButtonIsEnabled: true
                });
            });
    }

    renderClaimStatusMessage(){
        const {
            inProgress,
            success,
            error
        } = DividendClaimWindow.claimStatus;

        switch(this.state.claimStatus){
        case inProgress:
            return (
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
            );
        case error:
            return (
                <div className="ui error message wrapper-4 text-left" style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "2em"
                }}>
                    <div className="header">Dividend claim cancelled</div>
                    <div className="content">
                        {this.errorMessage}
                    </div>
                </div>
            );
        case success:
            return (
                <div className="ui success message wrapper-4" style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "2em"
                }}>
                    <div className="header">Your dividend share was successfully claimed!</div>
                </div>
            );
        default:
            return null;
        }
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
                {this.renderClaimStatusMessage()}
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