import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import $ from 'jquery';
import TableSorter from '../TableSorter';
import Strings from "../utils/Strings";
import {hideOnMobile, sortableTable} from "../utils/cssUtils";
import Paths from "../utils/Paths";
import {MAX_NR_OF_TRADES} from "../../site-settings";
import {CoinMarketFlashCell} from "./CoinMarketFlashCell";
import {
    mergeWithMarketData,
    calcTotalPercentChange
} from "../crypto/cryptoUtils";
import Dispatcher from '../Dispatcher';

class CoinMarketTable extends Component {
    static defaultProps = {
        cryptoMarketData: []
    };

    constructor(props){
        super(props);

        this.state = {
            placeholderIcons: []
        };

        this.prevProps = {cryptoMarketData: []};
        this.renderMarketData = this.renderMarketData.bind(this);
    }

    componentDidMount(){
        this.tablesorter = new TableSorter($("#coin-market-table"));

        new Dispatcher(this.props.dispatch)
            .updateAllCrypto()
            .then(() => {
                this.tablesorter.sortAtName("Rank");
            });
    }

    componentWillUnmount(){
        this.tablesorter.turnOffSorting();
    }

    componentDidUpdate(){
        if(this.tablesorter.hasSelectedHeader()){
            this.tablesorter.sortCurrentlySelected(
                this.tablesorter.$th.attr('class').includes(
                    TableSorter.defaultClassNames.ascending
                )
            );
        }
    }

    componentWillReceiveProps(){
        //TODO: make this work without componentWillReceiveProps
        this.prevProps = this.props;
    }

    renderMarketData(){
        return this.props.cryptoMarketData.map((crypto, i) => {
            let usdQuotes = crypto.quotes.USD;
            let totalPriceChange = calcTotalPercentChange(
                parseFloat(crypto.startPrice),
                parseFloat(usdQuotes.price)
            );

            let prevData = this.prevProps.cryptoMarketData.filter(
                prevData => prevData.name === crypto.name
            )[0];
            prevData = (prevData === undefined) ? crypto : prevData;
            let prevUsdQuotes = prevData.quotes.USD;
            let prevTotalPriceChange = calcTotalPercentChange(
                parseFloat(crypto.startPrice),
                parseFloat(prevUsdQuotes.price)
            );

            if(i === this.props.cryptoMarketData.length-1){
                this.prevProps = this.props;
            }

            return (
                <tr key={i}>
                    <td><img
                        src={(this.state.placeholderIcons.includes(`Icon ${i}`))
                            ? Paths.getCryptoIcon('placeholder', 'icon')
                            : Paths.getCryptoIcon(crypto.name, 'icon')}
                        onError={() => {
                            this.setState((prevState) => {
                                return {
                                    placeholderIcons: [
                                        ...prevState.placeholderIcons,
                                        `Icon ${i}`
                                    ]
                                }
                            });
                        }}/></td>
                    <td>{crypto.rank}</td>
                    <td>{crypto.name}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(usdQuotes.market_cap)}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(usdQuotes.volume_24h)}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(crypto.startPrice)}</td>
                    <td className={hideOnMobile()}>
                        <CoinMarketFlashCell
                            keyName={`price ${i}`}
                            value={usdQuotes.price}
                            prevValue={prevUsdQuotes.price}>
                            {Strings.toUSD(usdQuotes.price)}
                        </CoinMarketFlashCell>
                    </td>
                    <td className={hideOnMobile()}>
                        <CoinMarketFlashCell
                            value={usdQuotes.percent_change_24h}
                            prevValue={prevUsdQuotes.percent_change_24h}
                            addColor={true}>
                            {usdQuotes.percent_change_24h}
                        </CoinMarketFlashCell>
                    </td>
                    <td>
                        <CoinMarketFlashCell
                            value={totalPriceChange}
                            prevValue={prevTotalPriceChange}
                            addColor={true}>
                            {totalPriceChange}
                        </CoinMarketFlashCell>
                    </td>
                    <td className={hideOnMobile()}>{crypto.nrOfTrades}</td>
                    <td className={hideOnMobile()}>{crypto.pot}</td>
                    <td>
                        {(crypto.nrOfTrades < MAX_NR_OF_TRADES)
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
            <table id="coin-market-table" className={sortableTable()}>
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
                {(this.props.cryptoMarketData.length === 0 || this.props.isLoadingCrypto)
                    ? (
                        <tr>
                            <td colSpan={12}>
                                <div className="loader-small"/>
                            </td>
                        </tr>
                    )
                    : this.renderMarketData()}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        crypto,
        marketData,
        isLoadingCrypto
    } = state;

    return {
        cryptoMarketData: mergeWithMarketData(crypto, marketData),
        isLoadingCrypto
    };
};

export default connect(mapStateToProps)(CoinMarketTable);