import React, {Component} from 'react';
import Head from '../Head';
import Header from '../Header/index';
import Footer from '../Footer/index';
import {connect} from 'react-redux';
import {isLoadingMarketData, updateMarketData} from "../../../redux/actions";
import CoinMarketCapApi from "../../../services/CoinMarketCapApi/index";
import axios from 'axios';
import '../../../sass/style.scss';
import {TABLE_REFRESH_RATE} from "../../../site-settings";
import AlertOptionPane from "../../../services/Alert/AlertOptionPane";

class Page extends Component {
    static defaultProps = {
        head: null,
        header: null,
        footer: null,
        contentClass: '',
        addTimer: false,
        fetchMarketData: false
    };

    constructor(props){
        super(props);

        this.fetchMarketData = this.fetchMarketData.bind(this);
    }

    componentDidMount(){
        if(this.props.fetchMarketData){
            this.fetchMarketData();
        }

        if(this.props.addTimer){
            this.timer = setInterval(() => {
                this.fetchMarketData();
            }, TABLE_REFRESH_RATE);
        }
    }

    componentWillUnmount(){
        if(this.props.addTimer) {
            clearInterval(this.timer);
        }
    }

    fetchMarketData(){
        axios.get(CoinMarketCapApi.ticker())
            .then(response => {
                return Object.keys(response.data.data).map(dataKey =>
                    response.data.data[dataKey]
                );
            }).then(marketData => {
                this.props.dispatch(updateMarketData(marketData));
            }).catch(err => {
                if(this.props.addTimer) {
                    clearInterval(this.timer);
                }

                AlertOptionPane.showErrorAlert({message: err.toString()});
            });
    }

    render(){
        return (
            <section id="page">
                <Head>
                    {this.props.head}
                </Head>
                <Header id="page-header">
                    {this.props.header}
                </Header>
                <main id="page-content" className={this.props.contentClass}>
                    {this.props.children}
                </main>
                <Footer id="page-footer">
                    {this.props.footer}
                </Footer>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto} = state;
    return {crypto};
};

export default connect(mapStateToProps)(Page);