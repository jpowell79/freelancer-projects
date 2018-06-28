import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {definitionTable} from "../../../services/cssUtils/index";

class HistoricDataSummary extends Component {
    static defaultProps = {
        bestValueCrypto: {},
        isLoadingMarketData: true
    };

    static propTypes = {
        totalNrOfTrades: PropTypes.number.isRequired,
        totalPotSize: PropTypes.number.isRequired
    };

    render(){
        return (
            <table id="comparison-table" className={definitionTable()}>
                <tbody>
                    <tr>
                        <td className="six wide column">Total number of trades:</td>
                        <td>{this.props.totalNrOfTrades}</td>
                    </tr>
                    <tr>
                        <td className="six wide column">Total Pot Size:</td>
                        <td>{this.props.totalPotSize}</td>
                    </tr>
                    <tr>
                        <td className="six wide column">Highest %</td>
                        <td>{this.props.bestValueCrypto.name}</td>
                    </tr>
                    <tr>
                        <td className="six wide column">Value %</td>
                        <td>{this.props.bestValueCrypto.value}</td>
                    </tr>
                    <tr>
                        <td className="six wide column">Dividend Value:</td>
                        <td>To be implemented</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default HistoricDataSummary;