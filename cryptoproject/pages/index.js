import React, {Component} from 'react';
import Head from '../components/Head';
import {connect} from 'react-redux';
import CoinMarketTable from '../components/CoinMarket/CoinMarketTable';
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

class Index extends Component {
    render () {
        return (
            <div>
                <Head fetchMarketData={true} addTimer={true}/>
                <Header/>
                <CoinMarketTable/>
                <Footer/>
            </div>
        )
    }
}

export default connect()(Index);