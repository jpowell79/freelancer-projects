import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HistoricDataSummary extends Component {
    static defaultProps = {
        bestValueCrypto: {}
    };

    static propTypes = {
        totalnrOfBets: PropTypes.number.isRequired,
        totalPotSize: PropTypes.number.isRequired
    };

    render() {
        return (
            <div className="ui stackable centered three column grid">
                <div className="column">
                    <div className="ui statistics justify-content-center">
                        <div className="statistic">
                            <div className="value">{this.props.totalnrOfBets}</div>
                            <div className="label h4 lighter">Total number of trades</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui statistics justify-content-center">
                        <div className="statistic">
                            <div className="value">{this.props.totalPotSize}</div>
                            <div className="label h4 lighter">Total Pot Size</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui statistics justify-content-center">
                        <div className="statistic">
                            <div className="value">{this.props.bestValueCrypto.name}</div>
                            <div className="label h4 lighter">Highest %</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui statistics justify-content-center">
                        <div className="statistic">
                            <div className="value">{this.props.bestValueCrypto.value}</div>
                            <div className="label h4 lighter">Value %</div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="ui statistics justify-content-center">
                        <div className="statistic">
                            <div className="value">{this.props.tokenHolderClaim.totalEth}</div>
                            <div className="label h4 lighter">Token Holder Claim Value</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoricDataSummary;