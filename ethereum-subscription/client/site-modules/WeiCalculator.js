import React, {Component, Fragment} from 'react';
import CoinMarketCapApi from '../../services/api/CoinMarketCapApi';
import {Form, Dropdown} from 'semantic-ui-react';
import {isDefined} from '../../services/datatypes/strings';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {connect} from 'react-redux';

class WeiCalculator extends Component {
    static mapStateToProps = ({ethereumConversionRates}) => {
        const conversionRates = (ethereumConversionRates.length > 0)
            ? ethereumConversionRates
                .reduce((accumulator, currentValue) =>
                    Object.assign({}, accumulator, currentValue)
                )
            : {};

        return {
            ethereumConversionRates: conversionRates,
        };
    };

    constructor(props){
        super(props);

        const dropdownOptions = Object.keys(props.ethereumConversionRates)
            .map(rateKey => ({
                text: this.getCurrencyName(rateKey),
                value: rateKey
            }));

        const selectedCurrency = (dropdownOptions.length > 0) ? dropdownOptions[0].value : "";

        this.state = {
            ethereumConversionRates: {},
            dropdownOptions: dropdownOptions,
            selectedCurrency: selectedCurrency,
            conversionValue: '',
            copied: false
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

    getConversionRate = () => {
        const {ethereumConversionRates} = this.props;
        const {selectedCurrency} = this.state;

        const price = ethereumConversionRates[selectedCurrency].price;

        return Math.round(1000000000000000000/price);
    };

    getMinimumAmount = () => {
        const {ethereumConversionRates} = this.props;
        const {selectedCurrency} = this.state;

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
            conversionValue
        } = this.state;

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
                                    this.setState({
                                        conversionValue: event.target.value,
                                        copied: false
                                    });
                                }}
                            />
                        </Form.Field>
                        {(isDefined(conversionValue)) && (
                            <Fragment>
                                <Form.Field>
                                    <CopyToClipboard
                                        text={this.calcConversion()}
                                        onCopy={() => this.setState({copied: true})}
                                    >
                                        <p className="field-text">
                                            This would be the equivalent of <strong>{
                                            this.calcConversion()}</strong> Wei
                                        </p>
                                    </CopyToClipboard>
                                </Form.Field>
                                <CopyToClipboard
                                    text={this.calcConversion()}
                                    onCopy={() => this.setState({copied: true})}
                                >
                                    <button
                                        className="ui bg-color-uiBlue color-white button"
                                        disabled={this.state.copied}
                                    >
                                        {this.state.copied
                                            ? "Copied Wei"
                                            : "Copy"}
                                    </button>
                                </CopyToClipboard>
                            </Fragment>
                        )}
                    </Form>
                </Fragment>
            )
        );
    }
}

export default connect(WeiCalculator.mapStateToProps)(WeiCalculator);