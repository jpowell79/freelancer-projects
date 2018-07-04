import React, {Component} from 'react';
import Page from '../components/containers/Page';
import {connect} from 'react-redux';
import AccountDetails from '../components/pages/trading/AccountDetails';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import {mergeWithMarketData} from "../services/cryptoUtils";
import CoinMarketTable from "../components/pages/trading/CoinMarketTable";
import {TradingCountdown} from "../components/pages/trading/TradingCountdown";
import {TradingStats} from "../components/pages/trading/TradingsStats";
import Dispatcher from "../services/Dispatcher";
import {LoaderSmall} from "../components/modules/icons";

class Trade extends Component {
    componentDidMount(){
        new Dispatcher(this.props.dispatch).updateAllCrypto();
    }

    render() {
        const {
            isLoadingCrypto,
            cryptoMarketData
        } = this.props;

        const {
            skinny,
            bordered,
            attached,
            centered,
            noWidthPadding
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page fetchMarketData={true} addTimer={true}>
                <FullWidthSegment options={[gray, skinny, attached, bordered]} wrapper={2}>
                    <div className="ui padded segment">
                        <h2>Account Details</h2>
                        <AccountDetails/>
                    </div>
                </FullWidthSegment>
                {(isLoadingCrypto)
                    ? (
                        <FullWidthSegment options={[gray, skinny, bordered, noWidthPadding]}>
                            <LoaderSmall/>
                        </FullWidthSegment>
                    ) : (cryptoMarketData.length <= 0)
                        ? (
                            <FullWidthSegment options={[skinny, bordered, centered, noWidthPadding]}>
                                <h2>Error: Unable to load crypto data.</h2>
                            </FullWidthSegment>
                        ) : (
                            <React.Fragment>
                                <FullWidthSegment options={[skinny]} wrapper={1}>
                                    <TradingCountdown cryptoMarketData={cryptoMarketData}/>
                                </FullWidthSegment>
                                <FullWidthSegment options={[skinny, gray, bordered, centered]} wrapper={1}>
                                    <div className="ui padded segment">
                                        <TradingStats cryptoMarketData={cryptoMarketData}/>
                                    </div>
                                </FullWidthSegment>
                                <FullWidthSegment options={[skinny, noWidthPadding]}>
                                    <h2 className="centered title">Crypto Table</h2>
                                    <CoinMarketTable cryptoMarketData={cryptoMarketData}/>
                                </FullWidthSegment>
                            </React.Fragment>
                        )}
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

export default connect(mapStateToProps)(Trade);