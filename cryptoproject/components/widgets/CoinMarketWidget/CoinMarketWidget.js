import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Strings from '../../../services/Strings/index';
import $ from 'jquery';

class CoinMarketWidget extends Component {
    static defaultProps = {
        base: "USD",
        secondary: "",
        showTicker: true,
        showRank: true,
        showMarketCap: true,
        stats: "USD",
        showStatsticker: false,
        showVolume: true
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        base: PropTypes.string,
        secondary: PropTypes.string,
        showTicker: PropTypes.bool,
        showRank: PropTypes.bool,
        showMarketCap: PropTypes.bool,
        stats: PropTypes.string,
        showStatsticker: PropTypes.bool,
        showVolume: PropTypes.bool
    };

    componentDidMount(){
        if($('#coin-market-widget-script').length === 0){
            $('body').append(
                `<script
                    id="coin-market-widget-script"
                    type="text/javascript" 
                    src="https://files.coinmarketcap.com/static/widget/currency.js"></script>`
            );
        }
    }

    componentWillUnmount(){
        let $coinMarketWidgetScript = $('#coin-market-widget-script');

        if($coinMarketWidgetScript.length > 0) {
            $coinMarketWidgetScript.remove();
        }
    }

    render(){
        let {
            id,
            base,
            secondary,
            showTicker,
            showRank,
            showMarketCap,
            stats,
            showStatsticker,
            showVolume
        } = this.props;

        return (
            <div className="coinmarketcap-currency-widget"
                 data-currencyid={id}
                 data-base={base}
                 data-secondary={secondary}
                 data-ticker={Strings.booleanToString(showTicker)}
                 data-rank={Strings.booleanToString(showRank)}
                 data-marketcap={Strings.booleanToString(showMarketCap)}
                 data-volume={Strings.booleanToString(showVolume)}
                 data-stats={stats}
                 data-statsticker={Strings.booleanToString(showStatsticker)}/>
        );
    }
}

export default CoinMarketWidget;