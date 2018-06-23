import React, {Component} from 'react';
import PositiveFloatInput from '../../forms/PositiveFloatInput';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {MAX_ETH, LOWEST_ETH} from "../../../site-settings";
import {endTransaction, startTransaction} from "../../../redux/actions";
import Contract from '../../../server/services/contract';
import Web3 from '../../../server/services/Web3';
import AlertOptionPane from "../../Alert/AlertOptionPane";
import {LoaderTiny} from "../../icons";

//TODO: Wire up with some actual trade mechanism
class CryptoTrade extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        isLocked: PropTypes.bool.isRequired
    };

    static tradeStatus = {
        idle: "idle",
        success: "success",
        error: "error"
    };

    constructor(props){
        super(props);

        this.state = {
            hasCorrectInput: true
        };

        this.renderTradeForm = this.renderTradeForm.bind(this);
        this.renderTradeTransactionMessage = this.renderTradeTransactionMessage.bind(this);
        this.handleTrade = this.handleTrade.bind(this);
    }

    handleTrade(tradeValue){
        //TODO: Trading steps
        //1. Check if they entered the correct amount
        //2. Check their balance and error if it's not enough
        //3. Proceed with metamask.

        if(!CryptoTrade.isValidTrade(tradeValue)){
            AlertOptionPane.showErrorAlert({
                title: "Invalid trade",
                message: `Please correct the amount of Eth to ` +
                         `a value between ${LOWEST_ETH} and ${MAX_ETH}.`
            });
        } else if(!this.props.transaction.inProgress){
            this.props.dispatch(startTransaction());

            Web3.getAccountAddress().then(accountAddress => {
                return Web3.eth.getBalance(accountAddress);
            }).then(balance => {
                if(balance < tradeValue){
                    AlertOptionPane.showErrorAlert({
                        title: "Invalid trade",
                        message: `You're missing a total of ` +
                        `${tradeValue-balance} eth to make this trade.`
                    });

                    return null;
                }

                return Contract.enterTheGame(this.props.index, {
                    from: Web3.eth.defaultAccount,
                    value: tradeValue
                });
            }).then(transaction => {
                if(transaction !== null){
                    transaction.inProgress = false;
                    transaction.tradeStatus = CryptoTrade.tradeStatus.success;
                    this.props.dispatch(endTransaction(transaction));
                } else {
                    this.props.dispatch(endTransaction({
                        inProgress: false,
                        tradeStatus: CryptoTrade.tradeStatus.idle
                    }));
                }
            }).catch(() => {
                this.props.dispatch(endTransaction({
                    inProgress: false,
                    tradeStatus: CryptoTrade.tradeStatus.error
                }));
            });
        }
    }

    static isValidTrade(tradeValue){
        return (tradeValue >= LOWEST_ETH) && (tradeValue <= MAX_ETH);
    }

    renderTradeTransactionMessage(){
        let {transaction} = this.props;

        switch(transaction.tradeStatus){
        case CryptoTrade.tradeStatus.success:
            return (
                <div className="ui success message">
                    <div className="header">Trade Successful</div>
                    Transaction hash: {transaction.transactionHash}
                </div>
            );
        case CryptoTrade.tradeStatus.error:
            return (
                <div className="ui error message">
                    <div className="header">Trade Failed</div>
                    Trade cancelled. Please try again.
                </div>
            );
        default:
            return null;
        }
    }

    renderTradeForm(){
        let {
            tradeValue,
            hasCorrectInput
        } = this.state;

        let {
            isOpen,
            transaction
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
                            <button
                                className="ui primary submit button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.handleTrade(tradeValue);
                                }}>{(transaction.inProgress)
                                    ? <LoaderTiny className="secondary"/>
                                    : "Trade"}</button>
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
    let {transaction} = state;

    return {transaction};
};

export default connect(mapStateToProps)(CryptoTrade);