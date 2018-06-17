import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../../components/Head';
import crypto_01_contract from '../../components/crypto/contract/crypto_01_contract';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CryptoContent from '../../components/crypto/CryptoContent';
import CryptoSidebar from '../../components/crypto/CryptoSidebar';
import {updateCrypto} from "../../redux/actions";
import {fetchCryptoContract, getDefaultCrypto} from "../../components/crypto/cryptoUtils";
import AlertOptionPane from "../../components/Alert/AlertOptionPane";

class Crypto_01 extends Component {
    static defaultData = getDefaultCrypto({index: 1});

    static defaultProps = {
        marketData: {},
        data: Crypto_01.defaultData
    };

    static propTypes = {
        marketData: PropTypes.object,
        data: PropTypes.object
    };

    static fetchContract(){
        return fetchCryptoContract(
            crypto_01_contract,
            Crypto_01.defaultData.index
        );
    }

    componentDidMount(){
        Crypto_01.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(Object.assign({}, response, {
                index: Crypto_01.defaultData.index
            })));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    }

    render() {
        if (Object.keys(this.props.marketData).length > 0) {
            let {id} = this.props.marketData;
            let {name} = this.props.data;

            return (
                <div>
                    <Head fetchMarketData={false} addTimer={false}/>
                    <div id="crypto">
                        <Header/>
                        <CryptoContent data={Object.assign({}, this.props.data, this.props.marketData)}/>
                        <CryptoSidebar id={id} cryptoName={name}/>
                        <Footer/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Head fetchMarketData={true} addTimer={false}/>
                <div id="crypto">
                    <div className="loader"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto, marketData} = state;

    let cryptoData = crypto.filter(data =>
        data.index === Crypto_01.defaultData.index
    )[0];

    return {
        data: cryptoData,
        marketData: (marketData.length > 0 && cryptoData !== undefined)
            ? marketData.filter(data =>
                data.name.toLowerCase() === cryptoData.name.toLowerCase()
            )[0] : {}
    };
};

export const cryptoData01 = Crypto_01.defaultData;

export default connect(mapStateToProps)(Crypto_01);
