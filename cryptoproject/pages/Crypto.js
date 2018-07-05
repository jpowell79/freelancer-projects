import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page'
import CryptoContent from '../components/pages/crypto/CryptoContent/index';
import CryptoSidebar from '../components/pages/crypto/CryptoSidebar/index';
import {mergeWithMarketData} from "../services/cryptoUtils";
import {fullWidthSegment} from "../services/cssUtils";
import {CONTRACT_ADDRESSES} from "../site-settings";
import {withRouter} from 'next/router';
import Paths from '../services/Paths/';
import Dispatcher from "../services/Dispatcher";

class Crypto extends Component {
    static defaultProps = {
        marketData: [],
        crypto: []
    };

    static async getInitialProps({res, reduxStore, query}) {
        if(query.index === undefined){
            Paths.redirect(res, `${Paths.getCryptoPage('')}?index=0`);
        }

        let index = parseInt(query.index, 10);

        if(index < 0 || isNaN(query.index) || index >= CONTRACT_ADDRESSES.length){
            Paths.redirect(res, `${Paths.getCryptoPage('')}?index=0`);
        }

        let dispatcher = new Dispatcher(reduxStore.dispatch);
        await dispatcher.fetchMarketData();
        await dispatcher.fetchCryptoContract(index);

        return {index};
    }

    render() {
        const {cryptoMarketData} = this.props;

        if(cryptoMarketData.length === 0){
            return (
                <Page contentClass={fullWidthSegment('gray')}>
                    <div className="ui padded segment">
                        <h2 className="text-center">Error: Unable to load crypto data.</h2>
                    </div>
                </Page>
            )
        }

        const data = cryptoMarketData.filter(crypto =>
            crypto.index === this.props.index
        )[0];

        return (
            <Page contentClass="crypto" addTimer={true}>
                <CryptoContent data={data}/>
                <CryptoSidebar id={data.id} cryptoName={data.name}/>
            </Page>
        );
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

export default withRouter(connect(mapStateToProps)(Crypto));
