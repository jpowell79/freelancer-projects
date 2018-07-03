import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import CryptoTickerTape from "../components/pages/index/CryptoTickerTape";
import {mergeWithMarketData} from "../services/cryptoUtils";
import {LoaderSmall} from "../components/modules/icons";
import Dispatcher from "../services/Dispatcher";

class Index extends Component {
    componentDidMount(){
        new Dispatcher(this.props.dispatch).updateAllCrypto();
    }

    render () {
        const {
            isLoadingCrypto,
            cryptoMarketData
        } = this.props;

        return (
            <Page fetchMarketData={true} addTimer={true}>
                <FullWidthSegment>
                    {(isLoadingCrypto)
                        ? (
                            <LoaderSmall/>
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
        marketData,
        isLoadingCrypto
    } = state;

    return {
        cryptoMarketData: mergeWithMarketData(crypto, marketData),
        isLoadingCrypto
    };
};

export default connect(mapStateToProps)(Index);