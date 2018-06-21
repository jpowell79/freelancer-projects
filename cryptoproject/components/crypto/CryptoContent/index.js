import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paths from "../../utils/Paths";
import PropTypes from 'prop-types';
import {updateCrypto,} from "../../../redux/actions";
import CryptoBalance from './CryptoBalance';
import {CryptoStats} from "./CryptoStats";
import CryptoCountdown from './CryptoCountdown';
import CryptoTrade from "./CryptoTrade";
import {MAX_NR_OF_TRADES} from "../../../site-settings";
import {
    titledSegmentHeader,
    titledSegmentContent
} from "../../utils/cssUtils";

class CryptoContent extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            renderPlaceholderIcon: false
        };

        this.isOpen = this.isOpen.bind(this);
        this.isLocked = this.isLocked.bind(this);
    }

    isLocked(){
        let {extendedTimeCloses} = this.props.data;
        return Date.now() > extendedTimeCloses;
    }

    isOpen(){
        let {
            nrOfTrades,
            standardTimeCloses,
            extendedTimeCloses
        } = this.props.data;

        let hasEnoughTrades = (nrOfTrades < MAX_NR_OF_TRADES);
        let hasStandardTimeLeftOrTradeTokens =
            (Date.now() < standardTimeCloses) ||
            (this.props.tradeTokens !== null && this.props.tradeTokens > 0);
        let hasExtendedTimeLeft = (Date.now() < extendedTimeCloses);

        return hasEnoughTrades &&
            hasStandardTimeLeftOrTradeTokens &&
            hasExtendedTimeLeft;
    }

    render(){
        let {
            name,
            admin,
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
                            <img
                                src={(this.state.renderPlaceholderIcon)
                                    ? Paths.getCryptoIcon('placeholder', 'medium')
                                    : Paths.getCryptoIcon(name, 'medium')}
                                onError={() => {
                                    this.setState({renderPlaceholderIcon: true})
                                }}
                            />
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
                        <div className="sub header"><a href={`https://etherscan.io/address/${contractAddress}`}>{contractAddress}</a></div>
                    </h2>
                </section>
                <CryptoBalance
                    accountAddress={admin}
                    contractAddress={contractAddress}/>
                <section id="crypto-details">
                    <div className={titledSegmentHeader()}>
                        <h2>{name}<span className="small symbol">({symbol})</span></h2>
                    </div>
                    <div className={titledSegmentContent('children-divider-md')}>
                        <CryptoStats {...Object.assign(this.props.data, this.props.data.quotes.USD)}/>
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
                        <CryptoTrade
                            isOpen={this.isOpen()}
                            isLocked={this.isLocked()}/>
                    </div>
                </section>
            </section>
        );
    }
}

let mapStateToProps = (state) => {
    let {tradeTokens} = state;

    return {tradeTokens};
};

export default connect(mapStateToProps)(CryptoContent);