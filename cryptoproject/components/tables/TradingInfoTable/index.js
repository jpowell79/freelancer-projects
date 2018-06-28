import React, {Component} from 'react';
import {definitionTable} from "../../../services/cssUtils/index";
import {connect} from 'react-redux';
import {LoaderSmall} from "../../icons/index";
import {
    mergeWithMarketData,
    getHighestPercentTotal,
    getMostPopularCrypto
} from "../../../services/cryptoUtils/index";
import moment from 'moment';

class TradingInfoTable extends Component {
    render(){
        let {
            isLoadingCrypto,
            cryptoMarketData
        } = this.props;

        return (
            <table className={definitionTable()}>
                {(isLoadingCrypto)
                    ? (
                        <tbody>
                            <tr>
                                <td colSpan={2}><LoaderSmall/></td>
                            </tr>
                        </tbody>
                    )
                    : (cryptoMarketData.length > 0)
                        ? (
                            <tbody>
                            <tr>
                                <td className="six wide column">
                                    Standard trading period closes:
                                </td>
                                <td>
                                    {moment(cryptoMarketData[0].standardTimeCloses)
                                        .format('MMMM Do YYYY, h:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    Extended trading period closes:
                                </td>
                                <td>
                                    {moment(cryptoMarketData[0].extendedTimeCloses)
                                        .format('MMMM Do YYYY, h:mm:ss')}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    The current leading crypto is:
                                </td>
                                <td>
                                    {getHighestPercentTotal(cryptoMarketData).name}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    The most popular crypto is:
                                </td>
                                <td>
                                    {getMostPopularCrypto(cryptoMarketData).name}
                                </td>
                            </tr>
                            <tr>
                                <td className="six wide column">
                                    Total crypto trades:
                                </td>
                                <td>
                                    {cryptoMarketData
                                        .map(data => data.nrOfTrades)
                                        .reduce((accumulator, current) => {
                                            return accumulator + current;
                                        })}
                                </td>
                            </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="text-center">
                                        Unable to load crypto data.
                                    </td>
                                </tr>
                            </tbody>
                        )
                }
            </table>
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

export default connect(mapStateToProps)(TradingInfoTable);