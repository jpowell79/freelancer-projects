import React, {Component, Fragment} from 'react';
import axios from 'axios';
import CoinMarketCapApi from '../../services/CoinMarketCapApi';
import {Form, Dropdown} from 'semantic-ui-react';
import {isDefined} from '../../services/strings';

class ProviderCalculator extends Component {
    static convertCurrencies = [
        CoinMarketCapApi.fiatCurrencies.USD,
        CoinMarketCapApi.fiatCurrencies.GBP,
        CoinMarketCapApi.fiatCurrencies.EUR,
        CoinMarketCapApi.fiatCurrencies.JPY
    ];

    constructor(props){
        super(props);

        this.state = {
            ethereumConversionRates: {},
            dropdownOptions: [],
            selectedCurrency: '',
            conversionValue: '',
            isLoading: true
        }
    }

    getCurrencyName = (currency) => {
        const {USD, GBP, EUR, JPY} = CoinMarketCapApi.fiatCurrencies;

        switch(currency) {
        case USD:
            return "US Dollar - USD";
        case GBP:
            return "British Pound - GBP";
        case EUR:
            return "Euro - EUR";
        case JPY:
            return "Japanese Yen - JPY";
        default:
            throw new Error(`Unexpected currency ${currency}`);
        }
    };

    getCurrencySymbol = (currency) => {
        const {USD, GBP, EUR, JPY} = CoinMarketCapApi.fiatCurrencies;

        switch(currency) {
        case USD:
            return "$";
        case GBP:
            return "£";
        case EUR:
            return "€";
        case JPY:
            return "¥";
        default:
            throw new Error(`Unexpected currency ${currency}`);
        }
    };

    componentDidMount(){
        Promise.all(ProviderCalculator.convertCurrencies.map(currency => {
            return axios.get(CoinMarketCapApi.ticker({
                id: 1027,
                convert: currency
            })).then(res => ({[currency]: res.data.data.quotes[currency]}));
        })).then(conversionArray => {
            if(conversionArray.length > 0){
                return conversionArray.reduce((accumulator, currentValue) =>
                    Object.assign({}, accumulator, currentValue)
                );
            }

            return {};
        }).then(ethereumConversionRates => {
            const dropdownOptions = Object.keys(ethereumConversionRates)
                .map(rateKey => ({
                    text: this.getCurrencyName(rateKey),
                    value: rateKey
                }));

            if(dropdownOptions.length > 0){
                this.setState({
                    ethereumConversionRates,
                    dropdownOptions,
                    selectedCurrency: dropdownOptions[0].value,
                    isLoading: false
                });
            } else {
                this.setState({isLoading: false});
            }
        }).catch(err => {
            console.error(err);
        });
    }

    getConversionRate = () => {
        const {
            ethereumConversionRates,
            selectedCurrency
        } = this.state;

        const price = ethereumConversionRates[selectedCurrency].price;

        return Math.round(1000000000000000000/price);
    };

    getMinimumAmount = () => {
        const {
            ethereumConversionRates,
            selectedCurrency
        } = this.state;

        const minimumEth = 1/ethereumConversionRates["USD"].price;
        const minimumAmount = minimumEth * ethereumConversionRates[selectedCurrency].price;

        return (selectedCurrency === "USD")
            ? minimumAmount.toFixed(2)
            : (minimumAmount + 0.01).toFixed(2);
    };

    calcConversion = () => {
        if(isNaN(this.state.conversionValue)) return 0;

        return this.getConversionRate() * this.state.conversionValue;
    };

    render(){
        const {
            dropdownOptions,
            selectedCurrency,
            conversionValue,
            isLoading
        } = this.state;

        if(isLoading){
            return <p className="text">Loading currency rates...</p>;
        }

        return (
            (dropdownOptions.length > 0) && (
                <Fragment>
                    <Form>
                        <Form.Field>
                            <label>Home Currency:</label>
                            <Dropdown
                                selection
                                defaultValue={dropdownOptions[0].value}
                                options={dropdownOptions}
                                onChange={(event, {value}) => {
                                    this.setState({selectedCurrency: value});
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Current Rate:</label>
                            <span className="field-text">
                                {this.getCurrencySymbol(selectedCurrency)}1 = {this.getConversionRate()} Wei
                            </span>
                        </Form.Field>
                        <Form.Field>
                            <label>
                                Enter amount in {this.getCurrencySymbol(selectedCurrency)} you
                                wish to charge per month (minimum {
                                this.getCurrencySymbol(selectedCurrency)}{this.getMinimumAmount()}).
                            </label>
                            <input
                                type="text"
                                value={conversionValue}
                                onChange={(event) => {
                                    this.setState({conversionValue: event.target.value});
                                }}
                            />
                        </Form.Field>
                        {(isDefined(conversionValue)) && (
                            <Form.Field>
                                <p className="field-text">
                                    This would be the equivalent of <strong>{
                                    this.calcConversion()}</strong> Wei
                                </p>
                            </Form.Field>
                        )}
                    </Form>
                </Fragment>
            )
        );
    }
}

export default ProviderCalculator;