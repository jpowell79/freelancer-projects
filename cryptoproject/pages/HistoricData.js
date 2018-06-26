import React, {Component} from 'react';
import Head from '../components/Head';
import HistoricDataTable from '../components/HistoricDataTable';
import Header from "../components/Header";
import Footer from "../components/Footer";

class HistoricData extends Component {
    render(){
        return (
            <div id="historic-data">
                <Head fetchMarketData={false} addTimer={false}/>
                <Header/>
                <div className="wrapper">
                    <HistoricDataTable/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HistoricData;