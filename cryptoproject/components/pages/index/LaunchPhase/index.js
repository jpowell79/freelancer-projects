import React from 'react';
import Paths from "../../../../services/Paths";
import Files from "../../../../services/Files";
import {TokenCountdown} from '../TokenCountdown';
import FullWidthSegment from "../../../containers/FullWidthSegment";
import TokenPurchase from '../TokenPurchase';
import HideFragment from "../../../modules/HideFragment";

const LaunchPhase = ({title, completeTime, children}) => {
    return (
        <div className="text-center">
            <HideFragment>
                <TokenCountdown
                    title={title}
                    date={completeTime}
                    onTimeZero={() => {}}/>
                {children}
            </HideFragment>
        </div>
    );
};

const EthRaised = ({amountRaised, maximumRaised}) => {
    return (
        <div className="ui describing error progress">
            <h3 className="description normal">
                Raised: <span className="bold">
                    {amountRaised}
                </span>
            </h3>
            <div className="bar" style={{
                width: `${(amountRaised/maximumRaised)*100}%`
            }}/>
            <h3 className="start normal">0 ETH</h3>
            <h3 className="end normal">{maximumRaised} ETH</h3>
        </div>
    );
};

const WhitePaperButton = () => {
    return (
        <button
            className="ui large primary button"
            onClick={() => {
                Files.open(Paths.getFile({
                    name: 'whitepaper',
                    type: 'pdf'
                }));
            }}
        >Whitepaper</button>
    );
};

export const PreIcoLaunch = ({tokenSale}) => {
    return (
        <LaunchPhase
            title="Token Launch Start"
            completeTime={tokenSale.completeTime}>
            <WhitePaperButton/>
        </LaunchPhase>
    );
};


export const IcoLaunch = ({tokenSale}) => {
    const {
        skinny,
        noWidthPadding
    } = FullWidthSegment.options;

    return (
        <LaunchPhase
            title="Token Sale Ends"
            completeTime={tokenSale.completeTime}>
            <div className="wrapper-4">
                <TokenPurchase/>
                <FullWidthSegment options={[skinny, noWidthPadding]} className="no-padding-bottom">
                    <EthRaised
                        amountRaised={tokenSale.amountRaised}
                        maximumRaised={tokenSale.maximumRaised}
                    />
                    <WhitePaperButton/>
                </FullWidthSegment>
            </div>
        </LaunchPhase>
    );
};

export const PostIcoLaunch = ({tokenSale}) => {
    return (
        <LaunchPhase
            title="Token Sale Complete"
            completeTime={tokenSale.completeTime}>
            <div className="wrapper-4">
                <EthRaised
                    amountRaised={tokenSale.amountRaised}
                    maximumRaised={tokenSale.maximumRaised}
                />
                <WhitePaperButton/>
            </div>
        </LaunchPhase>
    )
};