import React, {Component} from 'react';
import {connect} from 'react-redux';
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";
import Countdown from 'react-countdown-now';
import Strings from "../../../../services/Strings";
import {LoaderSmall} from "../../../modules/icons";
import {claimEth} from '../../../../server/services/contract';
import HideFragment from '../../../modules/HideFragment';
import Dispatcher from "../../../../services/Dispatcher";

class TokenHolderClaimWindow extends Component {
    static claimStatus = {
        idle: "idle",
        inProgress: "inProgress",
        success: "success",
        error: "error"
    };

    constructor(props){
        super(props);

        this.state = {
            claimStatus: TokenHolderClaimWindow.claimStatus.idle,
            claimButtonIsEnabled: true
        };

        this.canMakeClaim = this.canMakeClaim.bind(this);
        this.claimEth = this.claimEth.bind(this);
        this.renderClaimStatusMessage = this.renderClaimStatusMessage.bind(this);
    }

    componentDidMount(){
        this.dispatcher = new Dispatcher(this.props.dispatch);
    }

    canMakeClaim(){
        const {
            claimInfo,
            tokenHolderClaim,
            account
        } = this.props;

        const claimWindowIsOpen = tokenHolderClaim.claimWindowIsOpen;
        const hasAccountAddress = Strings.isDefined(account.address);
        const hasNotMadeClaim = !claimInfo.hasMadeClaim;
        const hasEntitlement = claimInfo.entitlementEth > 0;

        return (
            claimWindowIsOpen &&
            hasAccountAddress &&
            hasNotMadeClaim &&
            hasEntitlement
        );
    }

    claimEth(){
        const {
            inProgress,
            success,
            error
        } = TokenHolderClaimWindow.claimStatus;

        this.setState({
            claimStatus: inProgress,
            claimButtonIsEnabled: false
        });

        let claimResponse;

        return claimEth(this.props.account.address)
            .then(response => {
                claimResponse = response;
                console.log(response);

                return this.dispatcher.updateClaimInfo(
                    this.props.account.address,
                    this.props.tokenHolderClaim.claimBlock
                );
            }).then(() => {
                return this.dispatcher.updateTokenHolderClaim();
            }).then(() => {
                //TODO: Show transaction hash from claimResponse

                this.setState({
                    claimStatus: success
                });
            }).catch((err) => {
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
        } = TokenHolderClaimWindow.claimStatus;

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
                    <div className="header">Token holder claim cancelled</div>
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
                    <div className="header">Your token holder share was successfully claimed!</div>
                </div>
            );
        default:
            return null;
        }
    }

    render(){
        const {
            account,
            tokenHolderClaim,
            claimInfo
        } = this.props;

        if(account.isLoading) return null;
        if(!Strings.isDefined(tokenHolderClaim.address)) return null;
        if(!Strings.isDefined(account.address)) return null;
        if(claimInfo.claimBlockTokenBalance === undefined) return null;

        const time = (tokenHolderClaim.claimWindowIsOpen)
            ? tokenHolderClaim.closeTime : tokenHolderClaim.openTime;
        const claimWindowText = (tokenHolderClaim.claimWindowIsOpen)
            ? "The claim window will close in" : "The claim window will open in";

        return (
            <div id="token-holder-claim-window">
                <h2 className="no-margin-bottom">The token holder claim window is currently</h2>
                <h3 className="capitalized">{
                    (tokenHolderClaim.claimWindowIsOpen) ? "OPEN" : "CLOSED"
                }</h3>
                <h2>{claimWindowText}</h2>
                <HideFragment>
                    <Countdown
                        date={time}
                        onComplete={() => {
                            this.dispatcher.updateClaimInfo(
                                this.props.account.address,
                                this.props.tokenHolderClaim.claimBlock
                            ).then(() => {
                                return this.dispatcher.updateTokenHolderClaim();
                            });
                        }}
                        renderer={CryptoCountdown.countdownRenderer}
                    />
                </HideFragment>
                {(this.canMakeClaim())
                    ? (
                        <React.Fragment>
                            <h2>Click the claim button to claim your entitlement</h2>
                            {(this.state.claimButtonIsEnabled) ? (
                                    <button
                                        className="ui huge primary button"
                                        onClick={this.claimEth}>Claim</button>
                                )
                                : (
                                    <button
                                        disabled
                                        className="ui huge primary button"
                                        onClick={this.claimEth}>Claim</button>
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
        claimInfo,
        tokenHolderClaim,
        account
    } = state;

    return {
        claimInfo,
        tokenHolderClaim,
        account
    };
};

export default connect(mapStateToProps)(TokenHolderClaimWindow);