import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import $ from 'jquery';
import TableSorter from '../TableSorter';
import Strings from "../utils/Strings";
import {hideOnMobile} from "../utils/cssUtils";
import {calcTotalPercentChange, clone, joinClassNames} from "../utils";
import Paths from "../utils/Paths";
import {fetchAllCryptoContracts} from "../crypto/cryptoUtils";
import {updateAllCrypto, isLoadingCrypto} from "../../redux/actions";
import AlertOptionPane from "../Alert/AlertOptionPane";

class CoinMarketTable extends Component {
    static defaultProps = {
        marketData: [],
        crypto: []
    };

    static propTypes = {
        marketData: PropTypes.array,
        crypto: PropTypes.array
    };

    constructor(props){
        super(props);

        this.renderMarketData = this.renderMarketData.bind(this);
        this.valueOnChangeClass = this.valueOnChangeClass.bind(this);
    }

    componentDidMount(){
        this.tablesorter = new TableSorter($("#coin-market-table"));
        this.props.dispatch(isLoadingCrypto(true));

        fetchAllCryptoContracts().then((responses) => {
            this.props.dispatch(updateAllCrypto(responses));
            this.props.dispatch(isLoadingCrypto(false));
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    }

    componentDidUpdate(prevProps){
        this.prevProps = clone(prevProps);
    }

    valueOnChangeClass(currentData){
        if(this.prevProps === undefined){
            return '';
        }

        let prevData = this.prevProps.marketData.filter(data => data.name === currentData.name);

        if(prevData.length !== 1){
            return '';
        }

        return (currentData.quotes.USD.price > prevData[0].quotes.USD.price)
            ? "color-uiGreen"
            : (currentData.quotes.USD.price === prevData[0].quotes.USD.price)
                ? ""
                : "color-uiRed";
    }

    static getValueClass(value){
        return (value < 0) ? "color-uiRed" : "color-uiGreen";
    }

    renderMarketData(){
        return this.props.marketData.map((data, i) => {
            let cryptoFilter = this.props.crypto.filter(cryptoData =>
                cryptoData.name.toLowerCase() === data.name.toLowerCase()
            );
            if(cryptoFilter.length === 0) return false;
            let crypto = cryptoFilter[0];
            let usdQuotes = data.quotes.USD;
            let totalPriceChange = calcTotalPercentChange(
                parseFloat(crypto.start_price),
                parseFloat(usdQuotes.price)
            );

            return (
                <tr key={i}>
                    <td><img src={Paths.getCryptoIcon(crypto.name, 'icon')}/></td>
                    <td>{crypto.rank}</td>
                    <td>{crypto.name}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(usdQuotes.market_cap)}</td>
                    <td className={hideOnMobile()}>{usdQuotes.volume_24h}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(crypto.start_price)}</td>
                    <td className={joinClassNames(
                        hideOnMobile(),
                        this.valueOnChangeClass(data)
                    )}>{Strings.toUSD(usdQuotes.price)}</td>
                    <td className={joinClassNames(
                        hideOnMobile(),
                        CoinMarketTable.getValueClass(usdQuotes.percent_change_24h)
                    )}>{usdQuotes.percent_change_24h}</td>
                    <td className={
                        CoinMarketTable.getValueClass(totalPriceChange)
                    }>{totalPriceChange}</td>
                    <td className={hideOnMobile()}>{crypto.nr_of_trades}</td>
                    <td className={hideOnMobile()}>{crypto.pot}</td>
                    <td>
                        {(crypto.nr_of_trades < 1000)
                            ? (
                                <button className="ui primary button">
                                    <Link href={{
                                        pathname: Paths.getCryptoPage(),
                                        query: {index: crypto.index}
                                    }}><a>Available</a></Link>
                                </button>
                            )
                            : (
                                <button className="ui button">
                                    <Link href={{
                                        pathname: Paths.getCryptoPage(),
                                        query: {index: crypto.index}
                                    }}><a>Unavailable</a></Link>
                                </button>
                            )
                        }
                    </td>
                </tr>
            )
        });
    }

    render(){
        return (
            <table id="coin-market-table" className="ui unstackable selectable sortable very compact celled small table">
                <thead>
                <tr>
                    <th className="no-sort">Icon</th>
                    <th>Rank</th>
                    <th>Name</th>
                    <th className={hideOnMobile()}>MCap</th>
                    <th className={hideOnMobile()}>Volume</th>
                    <th className={hideOnMobile()}>Start Price</th>
                    <th className={hideOnMobile()}>Now Price</th>
                    <th className={hideOnMobile()}>% 24hr</th>
                    <th>% Total</th>
                    <th className={hideOnMobile()}>Nr. Trades</th>
                    <th className={hideOnMobile()}>Pot</th>
                    <th className="no-sort">Trade</th>
                </tr>
                </thead>
                <tbody>
                {(this.props.isLoadingMarketData || this.props.isLoadingCrypto)
                    ? (
                        <tr>
                            <td colSpan={12}>
                                <div className="loader-small"/>
                            </td>
                        </tr>
                    )
                    : (
                        this.renderMarketData()
                    )
                }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        crypto,
        marketData,
        isLoadingMarketData,
        isLoadingCrypto
    } = state;

    return {
        crypto,
        marketData,
        isLoadingMarketData,
        isLoadingCrypto
    };
};

export default connect(mapStateToProps)(CoinMarketTable);