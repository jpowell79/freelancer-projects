import React, {Component} from 'react';
import FeedParser from "./FeedParser";
import PropTypes from "prop-types";
import {clone, flatten, reduce, joinClassNames} from "../utils";
import Strings from '../utils/Strings';

class Feed extends Component {
    static defaultProps = {
        searchFor: [],
        maxFeeds: -1,
        maxFeedsForEachUrl: -1,
        notFoundHtml: null,
        feedRenderer: undefined,
        className: ''
    };

    static propTypes = {
        searchFor: PropTypes.array,
        maxFeedsForEachUrl: PropTypes.number,
        maxFeeds: PropTypes.number,
        urls: PropTypes.array.isRequired,
        notFoundHtml: PropTypes.object,
        feedRenderer: PropTypes.func,
        className: PropTypes.string
    };

    static urls = {
        coinDesk: 'https://www.coindesk.com/feed/',
        coinTelegraph: 'https://cointelegraph.com/rss/',
        reddit: 'https://www.reddit.com/r/CryptoCurrency/top/.rss?format=xml',
        cryptoPotato: 'https://cryptopotato.com/feed/',
        coinsutra: 'https://coinsutra.com/blog/feed/',
        cryptoClarified: 'https://cryptoclarified.com/feed/'
    };

    constructor(props){
        super(props);

        this.state = {
            isLoadingFeeds: true,
            feeds: []
        };

        this.feedHtml = this.feedHtml.bind(this);
        this.fetchFeed = this.fetchFeed.bind(this);
    }

    componentDidMount(){
        this.fetchFeed();
    }

    fetchFeed(){
        let {
            searchFor,
            maxFeeds,
            maxFeedsForEachUrl,
            urls
        } = this.props;

        Promise.all(urls.map(url => feednami.load(url)))
            .then(responses => {
                return flatten(responses.map(response => {
                    let parser = new FeedParser(clone(response));
                    parser.parse(maxFeedsForEachUrl, searchFor);
                    return parser.feeds;
                }));
            })
            .then(feeds => {
                let key = 0;

                return flatten(feeds.map((feed) => {
                    return feed.entries.map((entry) => {
                        key += 1;

                        return this.feedHtml(key, entry, feed.meta);
                    });
                }));
            }).then(feeds => {
                if(maxFeeds >= 0){
                    this.setState({
                        feeds: reduce(feeds, maxFeeds),
                        isLoadingFeeds: false
                    });
                } else {
                    this.setState({
                        feeds,
                        isLoadingFeeds: false
                    });
                }
            });
    }

    feedHtml(key, entry, meta){
        if(this.props.feedRenderer !== undefined){
            return this.props.feedRenderer(key, entry, meta);
        }

        let dateTime = Strings.toDateTimeString(new Date(entry.date));

        return (
            <div key={key} className="item">
                <a href={entry.link} className="header">{entry.title}</a>
                <div className="description">{entry.author} - {dateTime}</div>
            </div>
        );
    }

    render(){
        return (
            <div className={joinClassNames("feed", this.props.className)}>
                {(this.state.feeds.length > 0)
                    ? this.state.feeds
                    : (this.state.isLoadingFeeds)
                        ? <p>Loading feeds...</p>
                        : this.props.notFoundHtml}
            </div>
        );
    }
}

export default Feed;