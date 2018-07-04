import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import CryptoTickerTape from "../components/pages/index/CryptoTickerTape";
import {mergeWithMarketData} from "../services/cryptoUtils";
import Dispatcher from "../services/Dispatcher";

class Index extends Component {
    static async getInitialProps({reduxStore}){
        let dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.updateAllCrypto();
        await dispatcher.fetchMarketData();

        return {};
    }

    render () {
        const {cryptoMarketData} = this.props;

        return (
            <Page addTimer={true}>
                <FullWidthSegment>
                    {(cryptoMarketData.length <= 0)
                        ? (
                            <p className="centered h3">Error: Unable to load crypto data.</p>
                        ) : (
                            <CryptoTickerTape cryptoMarketData={cryptoMarketData}/>
                        )}
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