import React from 'react';
import {joinClassNames} from "../../../../services/utils";
import CryptoCountdown from "../../crypto/CryptoContent/CryptoCountdown";

export const TradingCountDown = ({cryptoMarketData, className, ...props}) => {
    return (
        <CryptoCountdown
            {...props}
            className={joinClassNames("ui stackable center aligned hugging grid")}
            standardTimeCloses={cryptoMarketData[0].standardTimeCloses}
            extendedTimeCloses={cryptoMarketData[0].extendedTimeCloses}
            onStandardTimeZero={() => {}}
            onExtendedTimeZero={() => {}}
            standardTimeRenderer={(countdown, title) => {
                return (
                    <React.Fragment>
                        <div className="seven wide column">
                            <h2>{title}</h2>
                            <div className="content">
                                {countdown}
                            </div>
                        </div>
                        <div className="two wide column">
                            <div className="ui large icon header">
                                <i className="clock outline icon"/>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }}
            extendedTimeRenderer={(countdown, title) => {
                return (
                    <div className="seven wide column">
                        <h2>{title}</h2>
                        <div className="content">
                            {countdown}
                        </div>
                    </div>
                );
            }}
        />
    );
};