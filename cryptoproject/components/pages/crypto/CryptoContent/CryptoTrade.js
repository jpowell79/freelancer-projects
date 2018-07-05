import React, {Component} from 'react';
import PositiveFloatInput from '../../../modules/forms/PositiveFloatInput';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {MAX_ETH, LOWEST_ETH} from "../../../../site-settings";
import {LoaderSmall} from "../../../modules/icons/index";
import Paths from "../../../../services/Paths";

class CryptoTrade extends Component {
    static propTypes = {
        handleTrade: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        isLocked: PropTypes.bool.isRequired
    };

    static tradeStatus = {
        idle: "idle",
        inProgress: "inProgress",
        incorrectEth: "incorrectEth",
        notEnoughEth: "notEnoughEth",
        notEnoughTradeTokens: "notEnoughTradeTokens",
        tradeFailed: "tradeFailed",
        success: "success",
        error: "error"
    };

    constructor(props){
        super(props);

        this.state = {
            hasCorrectInput: true,
            tradeButtonIsEnabled: true
        };

        this.renderTradeForm = this.renderTradeForm.bind(this);
        this.renderTradeTransactionMessage = this.renderTradeTransactionMessage.bind(this);
        this.handleTrade = this.handleTrade.bind(this);
    }

    static isValidTrade(tradeValue){
        return (tradeValue >= LOWEST_ETH) && (tradeValue <= MAX_ETH);
    }

    renderTradeTransactionMessage(){
        let {
            transaction,
            account
        } = this.props;

        switch(transaction.tradeStatus){
        case CryptoTrade.tradeStatus.success:
            return (
                <div className="ui success message">
                    <div className="header">Your transaction has been approved!</div>
                    <span>You have successfully entered the game. Your transaction hash is </span>
                    <a href={`${Paths.getEtherScanTransactionUrl(transaction.transactionHash)}`} target="_blank">
                        {transaction.transactionHash}
                    </a>
                </div>
            );
        case CryptoTrade.tradeStatus.inProgress:
            return (
                <div className="ui icon info message">
                    <div>
                        <LoaderSmall/>
                    </div>
                    <div className="content">
                        <div className="header">Waiting for transaction confirmation</div>
                        <span>Please allow up to 30 seconds for the transaction to
                            be processed and written to the Ethereum blockchain.</span>
                    </div>
                </div>
            );
        case CryptoTrade.tradeStatus.tradeFailed:
            return (
                <div className="ui error message">
                    <div className="header">Trade Failed</div>
                    <span>We were unable to process your trade. Please ensure </span>
                    <span>your gas price and gas limit values are appropriate </span>
                    <span>for the trade and that you clicked on the SUBMIT </span>
                    <span>button in the MetaMask popup.</span>
                </div>
            );
        case CryptoTrade.tradeStatus.incorrectEth:
            return (
                <div className="ui error message">
                    {`Please correct the amount of Eth to a value between ${LOWEST_ETH} and ${MAX_ETH}`}
                </div>
            );
        case CryptoTrade.tradeStatus.notEnoughEth:
            return (
                <div className="ui error message">
                    {`Please note that you require a minimum of ${LOWEST_ETH} Eth to place a trade.`}
                </div>
            );
        case CryptoTrade.tradeStatus.notEnoughTradeTokens:
            return (
                <div className="ui error message">
                    <span>Please note that you need more than 0 trade tokens
                        to place a trade during the extended time period.</span>
                </div>
            );
        case CryptoTrade.tradeStatus.error:
            return (
                <div className="ui error message">
                    <div className="header">Trade Cancelled</div>
                    {(account.address === null)
                        ? "Unable to detect ethereum account address."
                        : "Please try again."}
                </div>
            );
        default:
            return null;
        }
    }

    handleTrade(event){
        event.preventDefault();

        this.setState({
            tradeButtonIsEnabled: false
        });

        this.props.handleTrade(this.state.tradeValue)
            .then(() => {
                this.setState({tradeButtonIsEnabled: true});
            });
    }

    renderTradeForm(){
        let {
            hasCorrectInput
        } = this.state;

        let {
            isOpen
        } = this.props;

        return (
            <div className="ui stackable padded grid centered">
                <h2>Trade now:</h2>
                <div className={
                    (hasCorrectInput) ? "ui action input" : "ui action input error"
                }>
                    <PositiveFloatInput
                        lowestDigit={LOWEST_ETH}
                        highestDigit={MAX_ETH}
                        placeholder={`Min ${LOWEST_ETH} eth`}
                        onIncorrectInput={(event) => {
                            this.setState({hasCorrectInput: false});
                            event.preventDefault();
                        }}
                        onCorrectInput={(event) => {
                            this.setState({
                                tradeValue: event.target.value,
                                hasCorrectInput: true
                            });
                        }}
                    />
                    {(isOpen)
                        ? (
                            (this.state.tradeButtonIsEnabled)
                                ? (
                                    <button
                                        className="ui primary submit button"
                                        onClick={this.handleTrade}>Trade</button>
                                ) : (
                                    <button
                                        disabled
                                        className="ui primary submit button"
                                        onClick={this.handleTrade}>Trade</button>
                                )
                        )
                        : <button disabled className="ui submit button">Locked</button>}
                </div>
            </div>
        );
    }

    render(){
        let {isLocked} = this.props;

        return (
            <div id="crypto-trade">
                {(isLocked)
                    ? (
                        <div className="ui message text-center">
                            <div className="header">
                                Trading is locked for this Crypto.
                            </div>
                        </div>
                    ) : (
                        this.renderTradeForm()
                    )}
                {this.renderTradeTransactionMessage()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {
        transaction,
        account
    } = state;

    return {
        transaction,
        account
    };
};

export default connect(mapStateToProps)(CryptoTrade);