import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Head from '../../components/Head';
import crypto_17_contract from '../../components/crypto/contract/crypto_01_contract';
import Header from '../../components/Header';
import CryptoContent from '../../components/crypto/CryptoContent';
import CryptoSidebar from '../../components/crypto/CryptoSidebar';
import Footer from '../../components/Footer';
import {updateCrypto} from "../../redux/actions";
import {fetchCryptoContract, getDefaultCrypto, cryptoNames} from "../../components/crypto/cryptoUtils";

class Crypto_17 extends Component {
    static defaultData = getDefaultCrypto({
        name: cryptoNames.nem,
        index: 17
    });

    static defaultProps = {
        marketData: {},
        data: Crypto_17.defaultData
    };

    static propTypes = {
        marketData: PropTypes.object,
        data: PropTypes.object
    };

    static fetchContract(){
        return fetchCryptoContract(crypto_17_contract, Crypto_17.defaultData.index);
    }

    componentDidMount(){
        /*
        Crypto_17.fetchContract().then(response => {
            this.props.dispatch(updateCrypto(response));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err});
        });
        */
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

    return {
        data: crypto.filter(data =>
            data.name.toLowerCase() === Crypto_17.defaultData.name.toLowerCase()
        )[0],
        marketData: (marketData.length > 0)
            ? marketData.filter(data =>
                data.name.toLowerCase() === Crypto_17.defaultData.name.toLowerCase()
            )[0]
            : {}
    };
};

export const cryptoData17 = Crypto_17.defaultData;

export default connect(mapStateToProps)(Crypto_17);
