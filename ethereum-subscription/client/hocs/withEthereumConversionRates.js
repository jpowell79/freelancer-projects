import React, {Component} from "react";
import {connect} from "react-redux";
import {getChildProps} from "../services/utils";
import CoinMarketCapApi from "../../services/api/CoinMarketCapApi";
import axios from "axios/index";
import {updateEthereumConversionRates} from "../redux/actions";

const defaultCurrencies = [
    CoinMarketCapApi.fiatCurrencies.USD,
    CoinMarketCapApi.fiatCurrencies.GBP,
    CoinMarketCapApi.fiatCurrencies.EUR,
    CoinMarketCapApi.fiatCurrencies.JPY
];

export default (Module, currencies = defaultCurrencies) => {
    class EthereumConversionRates extends Component {
        static async getInitialProps (appContext){
            const {reduxStore} = appContext;
            const moduleProps = await getChildProps(Module, appContext);

            try {
                const conversionRates = await Promise.all(currencies.map(currency => (
                    axios.get(CoinMarketCapApi.ticker({
                        id: 1027,
                        convert: currency
                    })).then(res => ({[currency]: res.data.data.quotes[currency]}))
                )));

                reduxStore.dispatch(updateEthereumConversionRates(conversionRates));
            } catch(e){
                console.error(e);
            }

            return {...moduleProps};
        }

        static mapStateToProps = ({ethereumConversionRates}) => ({ethereumConversionRates});

        render(){
            return <Module {...this.props}/>
        }
    }

    return connect(EthereumConversionRates.mapStateToProps)(EthereumConversionRates);
};