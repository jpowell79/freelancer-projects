import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CoinMarketWidget from '../../CoinMarket/CoinMarketWidget';
import Feed from '../../Feed';
import {
    RssSquare,
    Twitter
} from "../../icons";
import Strings from "../../utils/Strings";
import TwitterWidget from '../../TwitterWidget';
import {getTwitterFeeds} from "../cryptoUtils";

class CryptoSidebar extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        cryptoName: PropTypes.string.isRequired
    };

    render(){
        let maxFeeds = (this.props.cryptoName.toLowerCase() === 'bitcoin') ? 6 : 3;
        let twitterFeeds = getTwitterFeeds(this.props.cryptoName);

        return (
            <aside id="crypto-sidebar">
                <CoinMarketWidget id={this.props.id}/>
                <div>
                    <h3 className="ui attached bg-color-light-gray header top">
                        <RssSquare className="color-uiOrange"/>
                        <div className="content">RSS News Feed</div>
                    </h3>
                    <div className="ui attached segment">
                        <Feed
                            urls={[
                                Feed.urls.reddit,
                                Feed.urls.coinTelegraph,
                                Feed.urls.coinDesk,
                                Feed.urls.cryptoPotato,
                                Feed.urls.coinsutra,
                                Feed.urls.cryptoClarified
                            ]}
                            maxFeeds={maxFeeds}
                            maxFeedsForEachUrl={2}
                            searchFor={[this.props.cryptoName]}
                            className="ui divided list"
                            notFoundHtml={<p>No feeds were found for {this.props.cryptoName}.</p>}
                            feedRenderer={(key, entry) => {
                                let dateTime = Strings.toDateTimeString(new Date(entry.date));

                                if(this.props.cryptoName.toLowerCase() !== 'bitcoin'){
                                    return (
                                        <div key={key}>
                                            <h4 className="ui attached color-uiBlue header top">
                                                <a href={entry.link}>{entry.title}</a>
                                            </h4>
                                            {(entry.summary !== null && entry.summary !== "")
                                                ? (
                                                    <div key={key} className="ui attached segment">
                                                        <div dangerouslySetInnerHTML={{__html: entry.summary}}/>
                                                    </div>
                                                ) : null}
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key} className="item">
                                        <a href={entry.link} className="header">{entry.title}</a>
                                        <div className="description">{entry.author} - {dateTime}</div>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="ui attached bg-color-light-gray header top">
                        <Twitter className="color-uiBlue"/>
                        <div className="content">Twitter Feed</div>
                    </h3>
                    <div className="ui attached segment">
                        {twitterFeeds.map((feed, i) => (
                            <div key={i}>
                                <TwitterWidget feed={feed}/>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        );
    }
}

export default CryptoSidebar;