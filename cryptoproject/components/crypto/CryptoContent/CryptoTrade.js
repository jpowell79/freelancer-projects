import React, {Component} from 'react';
import PositiveFloatInput from '../../forms/PositiveFloatInput';
import PropTypes from "prop-types";

//TODO: Wire up with some actual trade mechanism
class CryptoTrade extends Component {
    static propTypes = {
        isOpen: PropTypes.func.isRequired
    };

    static tradeStatus = {
        idle: "idle",
        success: "success",
        error: "error"
    };

    constructor(props){
        super(props);

        this.state = {
            tradeStatus: CryptoTrade.tradeStatus.idle,
            hasCorrectInput: true
        };
    }

    static isValidTrade(tradeValue){
        return (tradeValue >= 0.1) && (tradeValue <= 10);
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

    render(){
        let {
            tradeValue,
            tradeStatus,
            hasCorrectInput
        } = this.state;

        return (
            <div id="trade-form" className="standard-divider">
                <div className="ui stackable padded grid centered">
                    <h2>Trade now:</h2>
                    <div className={
                        (hasCorrectInput) ? "ui action input" : "ui action input error"
                    }>
                        <PositiveFloatInput
                            lowestDigit={0.1}
                            highestDigit={10}
                            placeholder="Min 0.1 eth"
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
                        {this.props.isOpen()
                            ? <button
                                className="ui primary submit button"
                                onClick={(event) => {
                                    event.preventDefault();

                                    if(CryptoTrade.isValidTrade(tradeValue)){
                                        this.setState({
                                            tradeStatus: CryptoTrade.tradeStatus.success
                                        });
                                    } else {
                                        this.setState({
                                            tradeStatus: CryptoTrade.tradeStatus.error
                                        });
                                    }
                                }}>Trade</button>
                            : <button disabled className="ui submit button">Locked</button>}
                    </div>
                </div>
                {CryptoTrade.renderTradeTransactionMessage(tradeStatus)}
            </div>
        );
    }
}

export default CryptoTrade;