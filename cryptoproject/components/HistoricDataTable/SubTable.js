import React, {Component} from 'react';
import {connect} from 'react-redux';
import Strings from "../utils/Strings";
import PropTypes from 'prop-types';

//TODO: Figure out better name

class SubTable extends Component {
    static defaultProps = {
        bestValue: {}
    };

    static propTypes = {
        totalNrOfTrades: PropTypes.number.isRequired,
        totalPotSize: PropTypes.number.isRequired
    };

    render(){
        return (
            <table className="ui definition table">
                {(Object.keys(this.props.bestValue).length > 0)
                    ? (
                        <tbody>
                        <tr>
                            <td className="four wide column">Total number of trades:</td>
                            <td>{this.props.totalNrOfTrades}</td>
                        </tr>
                        <tr>
                            <td className="four wide column">Total Pot Size:</td>
                            <td>{this.props.totalPotSize}</td>
                        </tr>
                        <tr>
                            <td className="four wide column">Highest %</td>
                            <td>{this.props.bestValue.name} (To be implemented)</td>
                        </tr>
                        <tr>
                            <td className="four wide column">Value %</td>
                            <td>{Strings.toUSD(this.props.bestValue.quotes.USD.price)} (To be implemented)</td>
                        </tr>
                        <tr>
                            <td className="four wide column">Dividend Value:</td>
                            <td>To be implemented</td>
                        </tr>
                        </tbody>
                    )
                    : null}
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    let {marketData} = state;

    //TODO: should be (highest %) and (% Value)
    if(marketData.length === 0){
        return {};
    }

    return {
        bestValue: marketData.filter(data => data.name.toLowerCase() === "bitcoin")[0]
    }
};

export default connect(mapStateToProps)(SubTable);