import React from 'react';
import Strings from "../../utils/Strings";
import {calcTotalPercentChange} from "../../utils";
import {definitionTable} from "../../utils/cssUtils";

export const CryptoStats = ({
    rank,
    start_price,
    market_cap,
    volume_24h,
    price,
    nr_of_trades,
    percent_change_24h,
    pot
}) => {
    return (
        <section id="crypto-stats">
            <table className={definitionTable()}>
                <tbody>
                    <tr>
                        <td className="four wide column">Start Rank:</td>
                        <td>{rank}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Start Price:</td>
                        <td>{Strings.toUSD(start_price)}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Market Cap:</td>
                        <td>{Strings.toUSD(market_cap)}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Volume:</td>
                        <td>{volume_24h}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Current Price:</td>
                        <td>{Strings.toUSD(price)}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">24hr % Change:</td>
                        <td>{percent_change_24h}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Overall % Change:</td>
                        <td>{calcTotalPercentChange(parseFloat(start_price), parseFloat(price))}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Number of Trades:</td>
                        <td>{nr_of_trades}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Pot Size:</td>
                        <td>{pot}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};