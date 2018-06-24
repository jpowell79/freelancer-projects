import React, {Component} from 'react';
import Head from '../components/Head';
import HistoricDataTable from '../components/HistoricDataTable';
import Header from "../components/Header";
import Footer from "../components/Footer";

class HistoricData extends Component {
    render(){
        return (
            <div id="historic-data" className="wrapper">
                <Head fetchMarketData={false} addTimer={false}/>
                <Header/>
                <HistoricDataTable/>
                <Footer/>
            </div>
        );
    }
}

export default HistoricData;