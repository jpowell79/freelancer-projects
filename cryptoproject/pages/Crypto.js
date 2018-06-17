import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from '../components/Head/index';
import Header from '../components/Header/index';
import Footer from '../components/Footer/index';
import CryptoContent from '../components/crypto/CryptoContent/index';
import CryptoSidebar from '../components/crypto/CryptoSidebar/index';
import {updateCrypto, isLoadingCrypto} from "../redux/actions";
import {fetchCryptoContract} from "../components/crypto/cryptoUtils";
import AlertOptionPane from "../components/Alert/AlertOptionPane";
import {withRouter} from 'next/router';
import {redirect} from "../components/utils/index";
import Paths from '../components/utils/Paths';

class Crypto extends Component {
    static defaultProps = {
        marketData: [],
        crypto: []
    };

    static async getInitialProps ({res, req, query}) {
        if(query.index === undefined){
            redirect(res, `${Paths.getCryptoPage('')}?index=0`);
        }

        return {};
    }

    constructor(props){
        super(props);

        this.index = parseInt(this.props.router.query.index, 10);
        this.props.dispatch(isLoadingCrypto(true));
    }

    componentDidMount(){
        fetchCryptoContract(this.index)
            .then(response => {
                this.props.dispatch(updateCrypto(Object.assign({}, response, {
                    index: this.index
                })));
                this.props.dispatch(isLoadingCrypto(false));
            }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    }

    render() {
        const {
            crypto,
            marketData,
            isLoadingCrypto,
            isLoadingMarketData
        } = this.props;

        if(isLoadingMarketData || isLoadingCrypto){
            return (
                <div>
                    <Head fetchMarketData={true} addTimer={false}/>
                    <div id="crypto">
                        <div className="loader"/>
                    </div>
                </div>
            );
        }

        let currentCrypto = crypto.filter(cryptoObject => {
            return cryptoObject.index === this.index;
        })[0];

        let currentMarketData = marketData.filter(data =>
            data.name.toLowerCase() === currentCrypto.name.toLowerCase()
        )[0];

        return (
            <div>
                <Head fetchMarketData={false} addTimer={false}/>
                <div id="crypto">
                    <Header/>
                    <CryptoContent data={Object.assign({}, currentCrypto, currentMarketData)}/>
                    <CryptoSidebar id={currentMarketData.id} cryptoName={currentMarketData.name}/>
                    <Footer/>
                </div>
            </div>
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
