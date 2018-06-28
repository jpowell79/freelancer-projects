import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CoinMarketWidget from '../../widgets/CoinMarketWidget/CoinMarketWidget';
import Feed from '../../Feed/index';
import {
    RssSquare,
    Twitter
} from "../../icons/index";
import Strings from "../../../services/Strings/index";
import TwitterWidget from '../../widgets/TwitterWidget/index';
import {getTwitterFeeds} from "../../../services/cryptoUtils/index";
import {
    MAX_BITCOIN_FEEDS,
    MAX_BITCOIN_FEEDS_PER_URL,
    MAX_FEEDS,
    MAX_FEEDS_PER_URL,
    FEED_URLS
} from "../../../site-settings";
import {
    titledSegmentHeader,
    titledSegmentContent
} from "../../../services/cssUtils/index";

class CryptoSidebar extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        cryptoName: PropTypes.string.isRequired
    };

    render(){
        let {cryptoName} = this.props;
        let maxFeeds = MAX_FEEDS;
        let maxFeedsForEachUrl = MAX_FEEDS_PER_URL;
        let className = "ui divided list children-divider-3";
        let twitterFeeds = getTwitterFeeds(cryptoName);
        let feedRenderer = (key, entry) => {
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
        };

        if(cryptoName.toLowerCase() === 'bitcoin'){
            maxFeeds = MAX_BITCOIN_FEEDS;
            maxFeedsForEachUrl = MAX_BITCOIN_FEEDS_PER_URL;
            className = "ui divided list";
            feedRenderer = (key, entry) => {
                let dateTime = Strings.toDateTimeString(new Date(entry.date));

                return (
                    <div key={key} className="item">
                        <a href={entry.link} className="header">{entry.title}</a>
                        <div className="description">{entry.author} - {dateTime}</div>
                    </div>
                );
            };
        }

        return (
            <aside id="crypto-sidebar">
                <CoinMarketWidget id={this.props.id}/>
                <section id="crypto-rss-news-feed">
                    <h3 className={titledSegmentHeader()}>
                        <RssSquare className="color-uiOrange"/>
                        <div className="content">RSS News Feed</div>
                    </h3>
                    <div className={titledSegmentContent()}>
                        <Feed
                            urls={FEED_URLS}
                            maxFeeds={maxFeeds}
                            maxFeedsForEachUrl={maxFeedsForEachUrl}
                            searchFor={[cryptoName]}
                            className={className}
                            notFoundHtml={<p>No feeds related to {cryptoName} were found.</p>}
                            feedRenderer={feedRenderer}
                        />
                    </div>
                </section>
                <section id="crypto-twitter-feeds">
                    <h3 className={titledSegmentHeader()}>
                        <Twitter className="color-uiBlue"/>
                        <div className="content">Twitter Feed</div>
                    </h3>
                    <div className={titledSegmentContent('children-divider-2')}>
                        {twitterFeeds.map((feed, i) => (
                            <div key={i}>
                                <TwitterWidget feed={feed}/>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>
        );
    }
}

export default CryptoSidebar;