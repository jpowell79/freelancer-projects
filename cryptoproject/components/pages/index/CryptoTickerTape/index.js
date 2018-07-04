import React, {Component} from 'react';
import TickerTape from "../../../modules/TickerTape";
import Paths from "../../../../services/Paths";
import FullWidthSegment from "../../../containers/FullWidthSegment";
import Strings from "../../../../services/Strings";
import FlashCell from "../../../modules/FlashCell";
import {getPreviousData} from "../../../../services/cryptoUtils";
import {defaultComparator} from "../../../../services/utils";

class CryptoTickerTape extends Component {
    prevProps = {cryptoMarketData: []};

    componentWillReceiveProps(){
        this.prevProps = this.props;
    }

    render(){
        const {
            cryptoMarketData
        } = this.props;

        const {
            skinny
        } = FullWidthSegment.options;

        return (
            (cryptoMarketData.length > 0)
                ? (
                    <FullWidthSegment id="crypto-ticker-tape" options={[skinny]}>
                        <TickerTape items={cryptoMarketData.map((data, i) => {
                            const nowPrice = data.quotes.USD.price;
                            const prevData = getPreviousData(data, this.prevProps.cryptoMarketData);
                            const prevNowPrice = (prevData === undefined)
                                ? nowPrice : prevData.quotes.USD.price;

                            return (
                                <div key={i}>
                                    <h3 className="no-margin-bottom">
                                        <a href={`${Paths.getCryptoPage()}?index=${data.index}`}>{
                                            data.symbol
                                        }</a>
                                    </h3>
                                    <FlashCell
                                        initialCompare={() => {
                                            return defaultComparator(data.quotes.USD.percent_change_1h, 0);
                                        }}
                                        value={parseFloat(nowPrice.toFixed(3))}
                                        prevValue={parseFloat(prevNowPrice.toFixed(3))}>
                                        {Strings.toUSD(nowPrice)}
                                    </FlashCell>
                                </div>
                            );
                        })}/>
                    </FullWidthSegment>
                )
                : null
        );
    }
}

export default CryptoTickerTape;