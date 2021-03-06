import React from 'react';
import {joinClassNames} from "../../../../services/utils";
import {doublingThreeColumnGrid} from "../../../../services/cssUtils";
import {
    getHighestPercentTotal,
    getMostPopularCrypto
} from "../../../../services/cryptoUtils/index";

export const TradingStats = ({cryptoMarketData, className, id = "trading-stats", ...props}) => {
    return (
        <div {...props} id={id} className={joinClassNames(
            doublingThreeColumnGrid('center aligned'),
            className)
        }>
            <div className="column">
                <h2>The current leading crypto is</h2>
                <div className="ui statistics">
                    <div className="ui statistic no-margin">
                        <div className="lighter value">{getHighestPercentTotal(cryptoMarketData).name}</div>
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
                                .map(data => data.nrOfBets)
                                .reduce((accumulator, current) => {
                                    return accumulator + current;
                                })
                        }</div>
                    </div>
                </div>
            </div>
        </div>
    );
};