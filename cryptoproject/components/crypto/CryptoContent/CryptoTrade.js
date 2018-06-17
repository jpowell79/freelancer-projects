import React, {Component} from 'react';
import PositiveFloatInput from '../../forms/PositiveFloatInput';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {updateTradeStatus} from "../../../redux/actions";

//TODO: Wire up with some actual trade mechanism
class CryptoTrade extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired
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
    }

    componentWillUnmount(){
        this.props.dispatch(updateTradeStatus(CryptoTrade.tradeStatus.idle));
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
            hasCorrectInput
        } = this.state;

        let {
            tradeStatus,
            isOpen
        } = this.props;

        return (
            <div id="trade-form">
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
                        {(isOpen)
                            ? <button
                                className="ui primary submit button"
                                onClick={(event) => {
                                    event.preventDefault();

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
                            : <button disabled className="ui submit button">Locked</button>}
                    </div>
                </div>
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