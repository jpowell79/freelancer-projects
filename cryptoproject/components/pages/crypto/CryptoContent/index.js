import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paths from "../../../../services/Paths/index";
import PropTypes from 'prop-types';
import {
    endTransaction,
    updateTransactionStatus,
    startTransaction,
    updateCrypto
} from "../../../../redux/actions";
import CryptoBalance from './CryptoBalance';
import {CryptoStats} from "./CryptoStats";
import CryptoCountdown from './CryptoCountdown';
import CryptoTrade from "./CryptoTrade";
import {MAX_NR_OF_TRADES} from "../../../../site-settings";
import {
    titledSegmentHeader,
    titledSegmentContent
} from "../../../../services/cssUtils/index";
import Contract from "../../../../server/services/contract/index";
import web3 from "../../../../server/services/Web3/index";
import HideFragment from "../../../modules/HideFragment";

class CryptoContent extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.isOpen = this.isOpen.bind(this);
        this.isLocked = this.isLocked.bind(this);
        this.handleTrade = this.handleTrade.bind(this);
    }

    componentWillUnmount(){
        this.props.dispatch(endTransaction({
            inProgress: false,
            tradeStatus: CryptoTrade.tradeStatus.idle
        }));
    }

    isLocked(){
        let {extendedTimeCloses} = this.props.data;
        return Date.now() > extendedTimeCloses;
    }

    isOpen(){
        let {
            nrOfBets,
            standardTimeCloses,
            extendedTimeCloses
        } = this.props.data;

        let hasEnoughTrades = (nrOfBets < MAX_NR_OF_TRADES);
        let hasStandardTimeLeftOrTradeTokens =
            (Date.now() < standardTimeCloses) ||
            (this.props.account.tradeTokens !== null && this.props.account.tradeTokens > 0);
        let hasExtendedTimeLeft = (Date.now() < extendedTimeCloses);

        return hasEnoughTrades &&
            hasStandardTimeLeftOrTradeTokens &&
            hasExtendedTimeLeft;
    }

    async handleTrade(tradeValue){
        let {
            incorrectEth,
            notEnoughEth,
            tradeFailed,
            inProgress,
            success,
            error,
            idle
        } = CryptoTrade.tradeStatus;

        if(!CryptoTrade.isValidTrade(tradeValue)){
            this.props.dispatch(updateTransactionStatus(incorrectEth));
        } else if(this.props.transaction.tradeStatus !== inProgress){
            let address = '';
            this.props.dispatch(startTransaction());

            return web3.fetchAccountAddress().then(accountAddress => {
                address = accountAddress;
                return web3.fetchEthBalance(accountAddress);
            }).catch(() => {
                this.props.dispatch(endTransaction({
                    inProgress: false,
                    tradeStatus: error
                }));
            }).then(balance => {
                if(balance < tradeValue){
                    this.props.dispatch(updateTransactionStatus(notEnoughEth));

                    return null;
                } else if(this.props.data.standardTimeCloses < Date.now()){
                    if(this.props.account.tradeTokens <= 0){
                        this.props.dispatch(endTransaction({
                            inProgress: false,
                            tradeStatus: idle
                        }));

                        return null;
                    }
                }

                this.props.dispatch(updateTransactionStatus(inProgress));

                return Contract.enterTheGame(this.props.data.index, {
                    from: address,
                    value: tradeValue
                });
            }).then(transaction => {
                if(transaction !== null){
                    transaction.inProgress = false;
                    transaction.tradeStatus = success;
                    this.props.dispatch(endTransaction(transaction));
                    this.props.dispatch(updateCrypto(Object.assign(this.props.data, {
                        nrOfBets: this.props.data.nrOfBets+1,
                        pot: this.props.data.pot + tradeValue
                    })));
                }
            }).catch(() => {
                this.props.dispatch(endTransaction({
                    inProgress: false,
                    tradeStatus: tradeFailed
                }));
            });
        }
    }

    render(){
        let {
            name,
            symbol,
            contractAddress,
            standardTimeCloses,
            extendedTimeCloses,
        } = this.props.data;

        return (
            <section id="crypto-content">
                <section id="crypto-content-header" className="ui padded segment items">
                    <div className="item">
                        <div className="image">
                            <img src={Paths.getCryptoIcon({
                                symbol: symbol,
                                size: 'medium'
                            })}/>
                        </div>
                        <div className="middle aligned content no-padding text-center">
                            <h2 className="ui huge header no-margin-top">
                                {name}<span className="symbol">({symbol})</span>
                                <div className="sub header">Status: {(this.isOpen()) ? "Open" : "Locked"}</div>
                            </h2>
                        </div>
                    </div>
                </section>
                <section id="crypto-contract-address" className="ui segment header">
                    <h2 className="ui header no-margin-top">
                        This smart contract address is:
                        <div className="sub header">
                            <a href={`${Paths.getEtherScanAddressUrl(contractAddress)}`} target="_blank">{
                                contractAddress
                            }</a>
                        </div>
                    </h2>
                </section>
                <React.Fragment>
                    <CryptoBalance/>
                    <section id="crypto-details">
                        <div className={titledSegmentHeader()}>
                            <h2>{name}<span className="small symbol">({symbol})</span></h2>
                        </div>
                        <div className={titledSegmentContent('children-divider-2')}>
                            <CryptoStats {...Object.assign(this.props.data, this.props.data.quotes.USD)}/>
                            <HideFragment>
                                <CryptoCountdown
                                    standardTimeCloses={standardTimeCloses}
                                    extendedTimeCloses={extendedTimeCloses}
                                    onStandardTimeZero={() => {
                                        this.props.dispatch(updateCrypto(Object.assign(this.props.data, {
                                            standardTimeCloses: 0
                                        })));
                                    }}
                                    onExtendedTimeZero={() => {
                                        this.props.dispatch(updateCrypto(Object.assign(this.props.data, {
                                            extendedTimeCloses: 0
                                        })));
                                    }}
                                />
                            </HideFragment>
                            <CryptoTrade
                                isOpen={this.isOpen()}
                                isLocked={this.isLocked()}
                                handleTrade={this.handleTrade}
                            />
                        </div>
                    </section>
                </React.Fragment>
            </section>
        );
    }
}

let mapStateToProps = (state) => {
    let {account, transaction} = state;

    return {account, transaction};
};

export default connect(mapStateToProps)(CryptoContent);