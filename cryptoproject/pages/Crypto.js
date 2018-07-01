import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/containers/Page'
import CryptoContent from '../components/pages/crypto/CryptoContent/index';
import CryptoSidebar from '../components/pages/crypto/CryptoSidebar/index';
import {
    updateCrypto,
    isLoadingCrypto
} from "../redux/actions";
import {fullWidthSegment} from "../services/cssUtils";
import {Loader} from "../components/modules/icons";
import {fetchCryptoContract} from "../server/services/contract";
import {CONTRACT_ADDRESSES} from "../site-settings";
import {withRouter} from 'next/router';
import Paths from '../services/Paths/';

class Crypto extends Component {
    static defaultProps = {
        marketData: [],
        crypto: []
    };

    static async getInitialProps({res, query}) {
        if(query.index === undefined){
            Paths.redirect(res, `${Paths.getCryptoPage('')}?index=0`);
        }

        let index = parseInt(query.index, 10);

        if(index < 0 || isNaN(query.index) || index >= CONTRACT_ADDRESSES.length){
            Paths.redirect(res, `${Paths.getCryptoPage('')}?index=0`);
        }

        return {index: parseInt(query.index, 10)};
    }

    componentDidMount(){
        this.props.dispatch(isLoadingCrypto(true));

        fetchCryptoContract(this.props.index)
            .then(response => {
                this.props.dispatch(updateCrypto(Object.assign({}, response, {
                    index: this.props.index
                })));
                this.props.dispatch(isLoadingCrypto(false));
            }).catch(err => {
                console.error(err);
                this.props.dispatch(isLoadingCrypto(false));
            });
    }

    render() {
        const {
            index,
            crypto,
            marketData,
            isLoadingCrypto,
            isLoadingMarketData
        } = this.props;

        if(isLoadingMarketData || isLoadingCrypto){
            return (
                <Page fetchMarketData={true} contentClass={fullWidthSegment('light-gray')}>
                    <Loader/>
                </Page>
            );
        }

        if(crypto.length === 0){
            return (
                <Page fetchMarketData={true} contentClass={fullWidthSegment('light-gray')}>
                    <div className="ui padded segment">
                        <h2 className="text-center">Error: Unable to load crypto data.</h2>
                    </div>
                </Page>
            )
        }

        let currentCrypto = crypto.filter(cryptoObject =>
            cryptoObject.index === index
        )[0];

        let currentMarketData = marketData.filter(data =>
            data.name.toLowerCase() === currentCrypto.name.toLowerCase()
        )[0];

        return (
            <Page contentClass="crypto">
                <CryptoContent
                    data={Object.assign({}, currentCrypto, currentMarketData)}/>
                <CryptoSidebar
                    id={currentMarketData.id}
                    cryptoName={currentMarketData.name}/>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        crypto,
        marketData,
        isLoadingCrypto,
        isLoadingMarketData
    } = state;

    return {
        crypto,
        marketData,
        isLoadingCrypto,
        isLoadingMarketData
    };
};

export default withRouter(connect(mapStateToProps)(Crypto));
