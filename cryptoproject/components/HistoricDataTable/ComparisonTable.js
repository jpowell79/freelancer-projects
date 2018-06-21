import React, {Component} from 'react';
import {connect} from 'react-redux';
import Strings from "../utils/Strings";
import PropTypes from 'prop-types';
import {LoaderSmall} from '../icons';
import {definitionTable} from "../utils/cssUtils";

class ComparisonTable extends Component {
    static defaultProps = {
        bestValue: {},
        isLoadingMarketData: true
    };

    static propTypes = {
        totalNrOfTrades: PropTypes.number.isRequired,
        totalPotSize: PropTypes.number.isRequired
    };

    render(){
        return (
            <table id="comparison-table" className={definitionTable()}>
                {(Object.keys(this.props.bestValue).length > 0)
                    ? (
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
                                <td>{this.props.bestValue.name} (To be implemented)</td>
                            </tr>
                            <tr>
                                <td className="six wide column">Value %</td>
                                <td>{Strings.toUSD(this.props.bestValue.quotes.USD.price)} (To be implemented)</td>
                            </tr>
                            <tr>
                                <td className="six wide column">Dividend Value:</td>
                                <td>To be implemented</td>
                            </tr>
                        </tbody>
                    )
                    : (this.props.isLoadingMarketData)
                        ? (
                            <tbody>
                                <tr>
                                    <td colSpan={12}>
                                        <LoaderSmall/>
                                    </td>
                                </tr>
                            </tbody>
                        )
                        : null}
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    let {marketData, isLoadingMarketData} = state;

    //TODO: should be (highest %) and (% Value)
    if(marketData.length === 0){
        return {};
    }

    return {
        bestValue: marketData.filter(data => data.name.toLowerCase() === "bitcoin")[0],
        isLoadingMarketData
    }
};

export default connect(mapStateToProps)(ComparisonTable);