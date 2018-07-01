import React, {Component} from 'react';
import {definitionTable} from "../../../../services/cssUtils/index";
import {connect} from 'react-redux';
import {
    mergeWithMarketData,
    getHighestPercentTotal,
    getMostPopularCrypto
} from "../../../../services/cryptoUtils/index";
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";
import FullWidthSegment from "../../../containers/FullWidthSegment/index";

class TradingInfo extends Component {
    static defaultProps = {
        tableClass: definitionTable()
    };

    constructor(props){
        super(props);

        this.renderStats = this.renderStats.bind(this);
    }

    static renderCountdown(cryptoMarketData){
        return (
            <CryptoCountdown
                className="ui stackable center aligned hugging grid"
                standardTimeCloses={cryptoMarketData.standardTimeCloses}
                extendedTimeCloses={cryptoMarketData.extendedTimeCloses}
                onStandardTimeZero={() => {}}
                onExtendedTimeZero={() => {}}
                standardTimeRenderer={(countdown, title) => {
                    return (
                        [
                            <div key={1} className="seven wide column">
                                <h2>{title}</h2>
                                <div className="content">
                                    {countdown}
                                </div>
                            </div>,
                            <div key={2} className="two wide column">
                                <div className="ui large icon header">
                                    <i className="clock outline icon"/>
                                </div>
                            </div>
                        ]
                    );
                }}
                extendedTimeRenderer={(countdown, title) => {
                    return (
                        <div className="seven wide column">
                            <h2>{title}</h2>
                            <div className="content">
                                {countdown}
                            </div>
                        </div>
                    );
                }}
            />
        );
    }

    renderStats(highestPercent){
        const {cryptoMarketData} = this.props;

        return (
            <div className="ui stackable three column center aligned doubling grid">
                <div className="column">
                    <h2>The current leading crypto is</h2>
                    <div className="ui statistics">
                        <div className="ui statistic no-margin">
                            <div className="lighter value">{highestPercent.name}</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <h2>The most popular crypto is</h2>
                    <div className="ui statistics">
                        <div className="ui statistic no-margin">
                            <div className="lighter value">{getMostPopularCrypto(cryptoMarketData).name}</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <h2>Total crypto trades</h2>
                    <div className="ui statistics">
                        <div className="ui statistic no-margin">
                            <div className="lighter value">{
                                cryptoMarketData
                                    .map(data => data.nrOfTrades)
                                    .reduce((accumulator, current) => {
                                        return accumulator + current;
                                    })
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {
            isLoadingCrypto,
            cryptoMarketData
        } = this.props;

        const {
            skinny,
            bordered,
            centered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        let highestPercent = (cryptoMarketData.length > 0) ?
            getHighestPercentTotal(cryptoMarketData) : null;

        return (
            (!isLoadingCrypto && cryptoMarketData.length > 0)
                ? (
                    [
                        <FullWidthSegment key={1} options={[skinny]} wrapper={1}>
                            {TradingInfo.renderCountdown(cryptoMarketData[0])}
                        </FullWidthSegment>,
                        <FullWidthSegment key={2} options={[skinny, gray, bordered, centered]} wrapper={1}>
                            <div className="ui padded segment">
                                {this.renderStats(highestPercent, cryptoMarketData[0])}
                            </div>
                        </FullWidthSegment>
                    ]
                ) : null
        );
    }
}

const mapStateToProps = (state) => {
    let {
        isLoadingCrypto,
        marketData,
        crypto
    } = state;

    return {
        isLoadingCrypto,
        cryptoMarketData: mergeWithMarketData(crypto, marketData)
    };
};

export default connect(mapStateToProps)(TradingInfo);