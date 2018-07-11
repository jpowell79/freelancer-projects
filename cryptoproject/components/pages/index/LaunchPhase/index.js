import React from 'react';
import Paths from "../../../../services/Paths";
import Files from "../../../../services/Files";
import {TokenCountdown} from '../TokenCountdown';
import BackgroundSegment from "../../../containers/BackgroundSegment";
import FullWidthSegment from "../../../containers/FullWidthSegment";

const LaunchPhase = ({title, height = "50vh", children}) => {
    return (
        <BackgroundSegment imageUrl={Paths.getImage({
            name: 'header',
            type: 'jpg'
        })} className="parallax color-white" style={{height}}>
            <div className="position-center text-center wrapper" style={{
                padding: "2em",
                width: "100%"
            }}>
                <TokenCountdown
                    title={title}
                    date={0}
                    onTimeZero={() => {}}/>
                {children}
            </div>
            <div className="overlay-secondary"/>
        </BackgroundSegment>
    );
};

const EthRaised = () => {
    return (
        <div className="ui describing light error progress">
            <h3 className="description normal">
                Raised: <span className="bold">
                    4372.0 Eth
                </span>
            </h3>
            <div className="bar" style={{
                width: "38%"
            }}/>
            <h3 className="start normal">0 ETH</h3>
            <h3 className="end normal">5000 ETH</h3>
        </div>
    );
};

const WhitePaperButton = () => {
    return (
        <button
            className="ui huge primary button"
            onClick={() => {
                Files.open(Paths.getFile({
                    name: 'whitepaper',
                    type: 'pdf'
                }));
            }}
        >Whitepaper</button>
    );
};

export const PreIcoLaunch = () => {
    return (
        <LaunchPhase title="Token Launch Start">
            <WhitePaperButton/>
        </LaunchPhase>
    );
};

export const IcoLaunch = () => {
    return (
        <LaunchPhase title="Token Sale Ends" height="62.5vh">
            <div className="wrapper-4">
                <button className="ui huge primary button">Contribute</button>
                <FullWidthSegment options={['transparent', 'no-padding-bottom']}>
                    <EthRaised/>
                    <WhitePaperButton/>
                </FullWidthSegment>
            </div>
        </LaunchPhase>
    )
};

export const PostIcoLaunch = () => {
    return (
        <LaunchPhase title="Token Sale Complete" height="60vh">
            <div className="wrapper-4">
                <FullWidthSegment options={['transparent', 'no-padding-bottom']}>
                    <EthRaised/>
                    <WhitePaperButton/>
                </FullWidthSegment>
            </div>
        </LaunchPhase>
    )
};