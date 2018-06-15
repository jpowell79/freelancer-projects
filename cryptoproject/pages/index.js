import Head from '../components/Head';
import React from 'react';
import {connect} from 'react-redux';
import CoinMarketTable from '../components/CoinMarket/CoinMarketTable';
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

class Index extends React.Component {
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