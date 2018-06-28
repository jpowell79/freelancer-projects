import React from 'react';
import Strings from "../../utils/Strings";
import {definitionTable} from "../../utils/cssUtils";
import {
    calcTotalPercentChange,
    hasFinishPrice
} from "../cryptoUtils";

export const CryptoStats = ({
    rank,
    startPrice,
    market_cap,
    volume_24h,
    price,
    nrOfTrades,
    percent_change_24h,
    pot,
    finishPriceRetrievalTime,
    standardTimeCloses,
    extendedTimeCloses,
    finishPrice
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
                        <td>{Strings.toUSD(startPrice)}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Market Cap:</td>
                        <td>{Strings.toUSD(market_cap)}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Volume:</td>
                        <td>{Strings.toUSD(volume_24h)}</td>
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
                        <td>{calcTotalPercentChange(parseFloat(startPrice), parseFloat(price))}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Number of Trades:</td>
                        <td>{nrOfTrades}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Pot Size:</td>
                        <td>{pot}</td>
                    </tr>
                    <tr>
                        <td className="four wide column">Finish Price:</td>
                        <td>{(hasFinishPrice({
                                standardTimeCloses,
                                extendedTimeCloses,
                                finishPriceRetrievalTime
                            }) ? finishPrice : "Awaiting Result")}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};