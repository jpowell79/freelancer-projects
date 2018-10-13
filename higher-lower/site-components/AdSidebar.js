import React, {Fragment} from "react";
import {AdContainer} from "./containers/AdContainer";

export const AdSidebar = () => {
    return (
        <Fragment>
            <AdContainer className="bg-color-white glass">
                <a target="_blank" href="https://binance.com">
                    <img src="/static/images/ads/binance.png"/>
                </a>
            </AdContainer>
            <AdContainer className="bg-color-white glass">
                <a target="_blank" href="https://coinbase.com">
                    <img src="/static/images/ads/coinbase.png"/>
                </a>
            </AdContainer>
        </Fragment>
    );
};