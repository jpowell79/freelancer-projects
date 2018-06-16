import React, {Component} from 'react';
import NextHead from 'next/head';
import {connect} from 'react-redux';
import {isLoadingMarketData, updateMarketData} from "../../redux/actions";
import CoinMarketCapApi from "../CoinMarket/CoinMarketCapApi";
import Strings from "../utils/Strings";
import axios from 'axios';
import PropTypes from "prop-types";
import '../../sass/style.scss';
import AlertOptionPane from "../Alert/AlertOptionPane";

class Head extends Component {
    static REFRESH_RATE = 1000 * 30;

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
            }, Head.REFRESH_RATE);
        }
    }

    componentWillUnmount(){
        if(this.props.addTimer) {
            clearInterval(this.timer);
        }
    }

    fetchMarketData(){
        let names = this.props.crypto.map(data => data.name);

        axios.get(CoinMarketCapApi.ticker(), {}, {onUploadProgress: () => {
                if(!this.props.isLoadingMarketData){
                    this.props.dispatch(isLoadingMarketData(true));
                }
            }})
            .then(response => {
                return Object.values(response.data.data).filter(data => {
                    return Strings.includesIgnoreCase(names, data.name);
                });
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
        //TODO: move script to footer?
        return (
            <NextHead>
                <title>CoinMarketTable</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                <script src="https://static.sekandocdn.net/static/feednami/feednami-client-v1.1.js"/>
            </NextHead>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto} = state;
    return {crypto};
};

export default connect(mapStateToProps)(Head);