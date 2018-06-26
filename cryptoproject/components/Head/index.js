import React, {Component} from 'react';
import NextHead from 'next/head';
import {connect} from 'react-redux';
import {isLoadingMarketData, updateMarketData} from "../../redux/actions";
import CoinMarketCapApi from "../CoinMarket/CoinMarketCapApi";
import axios from 'axios';
import PropTypes from "prop-types";
import '../../sass/style.scss';
import {TABLE_REFRESH_RATE} from "../../site-settings";
import AlertOptionPane from "../Alert/AlertOptionPane";

class Head extends Component {
    static propTypes = {
        crypto: PropTypes.array,
        addTimer: PropTypes.bool.isRequired,
        fetchMarketData: PropTypes.bool.isRequired
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
        this.props.dispatch(isLoadingMarketData(true));

        axios.get(CoinMarketCapApi.ticker())
            .then(response => {
                return Object.keys(response.data.data).map(dataKey =>
                    response.data.data[dataKey]
                );
            }).then(marketData => {
                this.props.dispatch(updateMarketData(marketData));
                this.props.dispatch(isLoadingMarketData(false));
            }).catch(err => {
                if(this.props.addTimer) {
                    clearInterval(this.timer);
                }
                AlertOptionPane.showErrorAlert({message: err.toString()});

                this.props.dispatch(isLoadingMarketData(false));
            });
    }

    render(){
        return (
            <NextHead>
                <title>CoinMarketTable</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                <script src="https://static.sekandocdn.net/static/feednami/feednami-client-v1.1.js"/>
                {this.props.children}
            </NextHead>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto} = state;
    return {crypto};
};

export default connect(mapStateToProps)(Head);