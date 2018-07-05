import React, {Component} from 'react';
import Link from 'next/link';
import $ from 'jquery';
import TableSorter from '../../../../services/TableSorter/index';
import Strings from "../../../../services/Strings/index";
import {hideOnMobile, sortableTable} from "../../../../services/cssUtils/index";
import Paths from "../../../../services/Paths/index";
import {MAX_NR_OF_TRADES} from "../../../../site-settings";
import {
    getPreviousData,
    calcTotalPercentChange
} from "../../../../services/cryptoUtils/index";
import {defaultComparator} from "../../../../services/utils/index";
import FlashCell from "../../../modules/FlashCell/index";

class CoinMarketTable extends Component {
    constructor(props){
        super(props);

        this.prevProps = {cryptoMarketData: []};
        this.renderMarketData = this.renderMarketData.bind(this);
    }

    componentDidMount(){
        this.tablesorter = new TableSorter($("#coin-market-table"));
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
        this.prevProps = this.props;
    }

    renderMarketData(){
        return this.props.cryptoMarketData.map((crypto, i) => {
            const usdQuotes = crypto.quotes.USD;
            const totalPriceChange = calcTotalPercentChange(
                crypto.startPrice, usdQuotes.price
            );

            const prevData = getPreviousData(crypto, this.prevProps.cryptoMarketData);
            const prevUsdQuotes = prevData.quotes.USD;
            const prevTotalPriceChange = calcTotalPercentChange(
                crypto.startPrice, prevUsdQuotes.price
            );

            return (
                <tr key={i}>
                    <td><img src={Paths.getCryptoIcon(crypto.name, 'icon')}/></td>
                    <td>{crypto.rank}</td>
                    <td>{crypto.name}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(usdQuotes.market_cap)}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(usdQuotes.volume_24h)}</td>
                    <td className={hideOnMobile()}>{Strings.toUSD(crypto.startPrice)}</td>
                    <td className={hideOnMobile()}>
                        <FlashCell
                            initialCompare={() => {
                                return defaultComparator(usdQuotes.percent_change_1h, 0);
                            }}
                            value={parseFloat(usdQuotes.price.toFixed(3))}
                            prevValue={parseFloat(prevUsdQuotes.price.toFixed(3))}>
                            {Strings.toUSD(usdQuotes.price)}
                        </FlashCell>
                    </td>
                    <td className={hideOnMobile()}>
                        <FlashCell
                            shouldCellAnimate={(compare, isInitialCompare) => {
                                return usdQuotes.percent_change_24h !== prevUsdQuotes.percent_change_24h
                                    && !isInitialCompare;
                            }}
                            comparator={(value) => {
                                if(value < 0){
                                    return -1;
                                } else if(value > 0){
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }}
                            value={usdQuotes.percent_change_24h}
                            prevValue={prevUsdQuotes.percent_change_24h}>
                            {usdQuotes.percent_change_24h}
                        </FlashCell>
                    </td>
                    <td>
                        <FlashCell
                            shouldCellAnimate={(compare, isInitialCompare) => {
                                return totalPriceChange !== prevTotalPriceChange && !isInitialCompare;
                            }}
                            comparator={(value) => {
                                if(value < 0){
                                    return -1;
                                } else if(value > 0){
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }}
                            value={totalPriceChange}
                            prevValue={prevTotalPriceChange}>
                            {totalPriceChange}
                        </FlashCell>
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
                    {this.renderMarketData()}
                </tbody>
            </table>
        );
    }
}

export default CoinMarketTable;