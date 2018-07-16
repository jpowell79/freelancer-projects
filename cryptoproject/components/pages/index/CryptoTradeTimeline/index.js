import React from 'react';
import Settings from "../../../../site-settings";
import {
    CodeFile,
    Globe,
    Lightbulb,
    ReactIcon,
    Rocket
} from "../../../modules/icons";
import {
    VerticalTimeline,
    VerticalTimelineElement
} from "react-vertical-timeline-component";
import Paths from "../../../../services/Paths";

export const CryptoTradeTimeline = () => {
    return (
        <VerticalTimeline>
            <VerticalTimelineElement
                date="Q4 2017"
                icon={<Lightbulb className="color-uiYellow"/>}>
                <h3 className="no-margin-bottom">
                    CryptoTrade Conceived
                </h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                date="Q1 2018"
                icon={<CodeFile/>}>
                <h3 className="no-margin-bottom">
                    First smart contracts developed
                </h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                date="Q2 2018"
                icon={<ReactIcon className="color-uiTeal"/>}>
                <h3 className="no-margin-bottom">
                    Dapp/front-end built
                </h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                date="Q3 2018"
                icon={<Rocket className="small"/>}>
                <h3 className="no-margin-bottom">
                    Testnet launch on Kovan
                </h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                date="Q4 2018"
                icon={<Globe className="color-uiBlue"/>}>
                <h3 className="no-margin-bottom">
                    ICO launch and switch to mainnet
                </h3>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                date="Q1 2019"
                icon={
                    <div className="image">
                        <img className="color-uiGreen small" src={Paths.getIcon({
                            name: 'crypto_trade_token'
                        })}/>
                    </div>
                }>
                <h3 className="no-margin-bottom">
                    {Settings.TOKEN_NAME} holders receive dividends
                </h3>
            </VerticalTimelineElement>
        </VerticalTimeline>
    );
};