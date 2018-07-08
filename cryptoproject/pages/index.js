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
import Settings from '../site-settings';
import Zoom from 'react-reveal/Zoom';
import Paths from "../services/Paths";
import {PreIcoLaunch} from "../components/pages/index/PreIcoLaunch";
import {TokenCountdown} from "../components/pages/index/TokenCountdown";
import Files from "../services/Files";
import Link from 'next/link';

class Index extends Component {
    static async getInitialProps({reduxStore}){
        let dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.updateAllCrypto();
        await dispatcher.fetchMarketData();

        return {};
    }

    render () {
        const {
            halfHeight,
            skinny,
            padded,
            bordered,
            centered,
            attached
        } = FullWidthSegment.options;

        const {
            gray,
            gray2
        } = FullWidthSegment.options.colors;

        const {cryptoMarketData} = this.props;

        return (
            <Page contentClass="home" addTimer={true}>
                <FullWidthSegment options={[halfHeight]} className="color-white" style={{
                    position: "relative",
                    backgroundImage: `url('${Paths.getImage({
                        name: 'header',
                        type: 'jpg'
                    })}')`,
                    backgroundAttachment: "fixed",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover"
                }}>
                    <div className="wrapper-3" style={{
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <h1 className="display-3">CryptoTrade</h1>
                        <p className="elegant">
                            CryptoTrade harnesses the power of pari-mutuel betting and Ethereum
                            smart contracts to bet on the performance of leading crypto-currencies
                            over a fixed period.
                        </p>
                        <button className="ui primary huge button">
                            <Link href={Paths.getTradingPage()}><a>Trade Now</a></Link>
                        </button>
                    </div>
                    <div className="overlay-secondary"/>
                </FullWidthSegment>
                <FullWidthSegment options={[gray2, bordered, centered]} wrapper={3}>
                    <TokenCountdown
                        title="Token Launch Start"
                        date={0}
                        onTimeZero={() => {}}/>
                    <div className="divider-1">
                        <button
                            className="ui huge primary button"
                            onClick={() => {
                                Files.open(Paths.getFile({
                                    name: 'whitepaper',
                                    type: 'pdf'
                                }));
                            }}
                        >Whitepaper</button>
                    </div>
                </FullWidthSegment>
                <FullWidthSegment options={[centered]} wrapper={3}>
                    <PreIcoLaunch/>
                </FullWidthSegment>
                {(cryptoMarketData.length > 0) && (
                    <FullWidthSegment options={[gray, skinny, bordered]}>
                        <CryptoTickerTape cryptoMarketData={cryptoMarketData}/>
                    </FullWidthSegment>
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
                <FullWidthSegment options={[bordered, centered]} wrapper={1}>
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
                    <CryptoTradeTimeline/>
                </FullWidthSegment>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        crypto,
        marketData
    } = state;

    return {
        cryptoMarketData: mergeWithMarketData(crypto, marketData)
    };
};

export default connect(mapStateToProps)(Index);