import React, {Component} from 'react';
import {connect} from 'react-redux';
import Page from '../components/Page'
import CryptoContent from '../components/crypto/CryptoContent';
import CryptoSidebar from '../components/crypto/CryptoSidebar';
import {
    updateCrypto,
    isLoadingCrypto
} from "../redux/actions";
import {Loader} from "../components/icons";
import {fetchCryptoContract} from "../server/services/contract";
import {CONTRACT_ADDRESSES} from "../site-settings";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import {withRouter} from 'next/router';
import Paths from '../components/utils/Paths';

class Crypto extends Component {
    static defaultProps = {
        marketData: [],
        crypto: []
    };

    static async getInitialProps ({res, query}) {
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
                AlertOptionPane.showErrorAlert({message: err.toString()});
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
                <Page fetchMarketData={true} addTimer={false}>
                    <Loader/>
                </Page>
            );
        }

        if(crypto.length === 0){
            return (
                <Page fetchMarketData={true} addTimer={false}>
                    <h2 className="text-center">Error: Unable to load crypto data.</h2>
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
            <Page fetchMarketData={false}
                  addTimer={false}
                  contentClass="crypto">
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
