import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import CryptoTickerTape from "../components/pages/index/CryptoTickerTape";
import {mergeWithMarketData} from "../services/cryptoUtils";
import Dispatcher from "../services/Dispatcher";
import {WhatIsCryptoTrade} from "../components/pages/index/WhatIsCryptoTrade";
import {WhatAreTokens} from "../components/pages/index/WhatAreTokens";
import {TokenInfo} from "../components/pages/index/TokenInfo";
import {CryptoTradeTimeline} from "../components/pages/index/CryptoTradeTimeline";
import LaunchPhase from "../components/pages/index/LaunchPhase";
import Settings from '../site-settings';
import Zoom from 'react-reveal/Zoom';
import Paths from "../services/Paths";
import {PurchaseInEther} from "../components/pages/index/PurchaseInEther";
import Link from 'next/link';
import {twoColumnGrid} from "../services/cssUtils";
import BackgroundSegment from "../components/containers/BackgroundSegment";

class Index extends Component {
    static async getInitialProps({req, reduxStore, hasDatabase}){
        const dispatcher = new Dispatcher(reduxStore.dispatch);

        await dispatcher.updateAllCrypto({
            request: req,
            hasDatabase
        });
        await dispatcher.fetchMarketData();
        await dispatcher.updateTokenSale();

        return {};
    }

    render () {
        const {
            skinny,
            padded,
            bordered,
            centered,
            attached,
            halfHeight
        } = FullWidthSegment.options;

        const {
            gray2
        } = FullWidthSegment.options.colors;

        const {
            cryptoMarketData,
            tokenSale
        } = this.props;

        return (
            <Page addTimer={true} header={
                (tokenSale.postIcoCountdown > Date.now()) ? (
                    <FullWidthSegment wrapper={1}>
                        <div className={twoColumnGrid('unstack-lg reverse-order')}>
                            <div className="centered column">
                                <div className="ui padded bg-color-gray segment" style={{flex: 1}}>
                                    <PurchaseInEther tokenSaleAddress={tokenSale.address}/>
                                </div>
                            </div>
                            <div className="centered column">
                                <LaunchPhase onComplete={() => {
                                    this.forceUpdate();
                                }}/>
                            </div>
                        </div>
                    </FullWidthSegment>
                ) : null
            }>
                {(cryptoMarketData.length > 0) && (
                    <FullWidthSegment options={[gray2, skinny, bordered]}>
                        <CryptoTickerTape cryptoMarketData={cryptoMarketData}/>
                    </FullWidthSegment>
                )}
                {tokenSale.postIcoCountdown <= Date.now() && (
                    <BackgroundSegment
                        imageUrl={Paths.getImage({
                            name: 'header',
                            type: 'jpg'
                        })}
                        className="parallax color-white"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        options={[centered, halfHeight]}
                        wrapper={4}
                    >
                        <div>
                            <h1 className="page-title color-white">CryptoTrade</h1>
                            <p className="elegant h2">
                                CryptoTrade harnesses the power of pari-mutuel betting and
                                Ethereum smart contracts to bet on the performance of leading
                                crypto-currencies over a fixed period.
                            </p>
                            <div className="text-center divider-1">
                                <button className="ui auxilary color-white huge button">
                                    <Link href={Paths.getTradingPage()}><a>Trade Now</a></Link>
                                </button>
                            </div>
                        </div>
                        <div className="overlay-secondary"/>
                    </BackgroundSegment>
                )}
                <FullWidthSegment options={[bordered, padded, attached]} wrapper={1}>
                    <Zoom delay={100} duration={750}>
                        <WhatIsCryptoTrade/>
                        <div className="text-center divider-1">
                            <button className="ui primary huge button">
                                <Link href={Paths.getTradingPage()}><a>Trade Now</a></Link>
                            </button>
                        </div>
                    </Zoom>
                </FullWidthSegment>
                <FullWidthSegment options={[gray2, padded]} wrapper={1}>
                    <Zoom delay={100} duration={750}>
                        <WhatAreTokens/>
                    </Zoom>
                </FullWidthSegment>
                <FullWidthSegment options={[bordered, centered]} wrapper={2}>
                    <div className="title">
                        <h2 className="capitalized color-black bold display-5">
                            {Settings.TOKEN_NAME} Token Info
                        </h2>
                        <p className="h3">
                            Live from <a href="https://www.coinmarketcap.com">coinmarketcap.com</a> -
                            prices refreshes every {Settings.TABLE_REFRESH_RATE/1000} seconds
                        </p>
                    </div>
                    <TokenInfo cryptoMarketData={cryptoMarketData}/>
                </FullWidthSegment>
                <FullWidthSegment options={[padded, gray2]} wrapper={1}>
                    <div className="title text-center">
                        <h2 className="color-black bold display-5">
                            CryproTrade Timeline
                        </h2>
                    </div>
                    <CryptoTradeTimeline/>
                </FullWidthSegment>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        crypto,
        marketData,
        tokenSale
    } = state;

    return {
        cryptoMarketData: mergeWithMarketData(crypto, marketData),
        tokenSale
    };
};

export default connect(mapStateToProps)(Index);