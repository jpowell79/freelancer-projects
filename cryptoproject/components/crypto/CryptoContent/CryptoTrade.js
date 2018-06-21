import React, {Component} from 'react';
import PositiveFloatInput from '../../forms/PositiveFloatInput';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {MAX_ETH, LOWEST_ETH} from "../../../site-settings";
import {updateTradeStatus} from "../../../redux/actions";

//TODO: Wire up with some actual trade mechanism
class CryptoTrade extends Component {
    static propTypes = {
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
    }

    componentWillUnmount(){
        this.props.dispatch(updateTradeStatus(CryptoTrade.tradeStatus.idle));
    }

    static isValidTrade(tradeValue){
        return (tradeValue >= LOWEST_ETH) && (tradeValue <= MAX_ETH);
    }

    static renderTradeTransactionMessage(tradeStatus){
        switch(tradeStatus){
        case CryptoTrade.tradeStatus.success:
            return (
                <div className="ui success message">
                    <div className="header">Trade Successful</div>
                    Response on success/failure of trade with tx hash of transaction
                </div>
            );
        case CryptoTrade.tradeStatus.error:
            return (
                <div className="ui error message">
                    <div className="header">Trade Failed</div>
                    Response on success/failure of trade with tx hash of transaction
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
                            <button
                                className="ui primary submit button"
                                onClick={(event) => {
                                    event.preventDefault();

                                    //TODO: Trading steps
                                    //1. Check if they entered the correct amount
                                    //2. Check their balance and error if it's not enough
                                    //3. Proceed with metamask.

                                    if(CryptoTrade.isValidTrade(tradeValue)){
                                        this.props.dispatch(updateTradeStatus(
                                            CryptoTrade.tradeStatus.success
                                        ));
                                    } else {
                                        this.props.dispatch(updateTradeStatus(
                                            CryptoTrade.tradeStatus.error
                                        ));
                                    }
                                }}>Trade</button>
                        )
                        : <button disabled className="ui submit button">Locked</button>}
                </div>
            </div>
        );
    }

    render(){
        let {
            tradeStatus,
            isLocked,
        } = this.props;

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
                {CryptoTrade.renderTradeTransactionMessage(tradeStatus)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {tradeStatus} = state;

    return {tradeStatus};
};

export default connect(mapStateToProps)(CryptoTrade);