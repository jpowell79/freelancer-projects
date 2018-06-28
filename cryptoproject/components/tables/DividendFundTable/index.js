import React, {Component} from 'react';
import {definitionTable} from "../../../services/cssUtils/index";
import CoinMarketCapApi from '../../../services/CoinMarketCapApi/index';
import axios from 'axios';
import {LoaderSmall} from "../../icons/index";
import Strings from '../../../services/Strings/index';

class DividendFundTable extends Component {
    state = {};

    componentDidMount(){
        axios.get(CoinMarketCapApi.ticker({id: 1}))
            .then(response => {
                return response.data.data;
            })
            .then(dividend => {
                this.setState({dividend});
            });
    }

    render(){
        return (
            <table className={definitionTable()}>
                {(this.state.dividend === undefined)
                    ? (
                        <tbody>
                            <tr>
                                <td colSpan={2}><LoaderSmall/></td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td className="four wide column">
                                    Market Cap:
                                </td>
                                <td>
                                    {Strings.toUSD(this.state.dividend.quotes.USD.market_cap)}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    Volume:
                                </td>
                                <td>
                                    {Strings.toUSD(this.state.dividend.quotes.USD.volume_24h)}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    Current Price:
                                </td>
                                <td>
                                    {Strings.toUSD(this.state.dividend.quotes.USD.price)}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    24hr % Change:
                                </td>
                                <td>
                                    {this.state.dividend.quotes.USD.percent_change_24h}
                                </td>
                            </tr>
                        </tbody>
                    )}
            </table>
        );
    }
}

export default DividendFundTable;