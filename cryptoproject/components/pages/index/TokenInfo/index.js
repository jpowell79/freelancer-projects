import React from 'react';
import {doublingThreeColumnGrid} from "../../../../services/cssUtils";
import Strings from "../../../../services/Strings";

export const TokenInfo = ({cryptoMarketData = []}) => {
    if(cryptoMarketData.length === 0){
        return null;
    }

    const crypto = cryptoMarketData[0].quotes.USD;

    return (
        <div className={doublingThreeColumnGrid('center aligned')}>
            <div className="column">
                <div className="ui centered statistics">
                    <div className="ui statistic no-margin">
                        <div className="value">{Strings.toUSD(crypto.price)}</div>
                        <div className="capitalized h4 normal">Current Price</div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui centered statistics break-all">
                    <div className="ui statistic no-margin">
                        <div className="value">{Strings.toUSD(crypto.market_cap)}</div>
                        <div className="capitalized h3 normal">Market Cap</div>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui centered statistics break-all">
                    <div className="ui statistic no-margin">
                        <div className="value">{Strings.toUSD(crypto.volume_24h)}</div>
                        <div className="capitalized h3 normal">Volume</div>
                    </div>
                </div>
            </div>
        </div>
    );
};