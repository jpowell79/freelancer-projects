import React, {Component} from 'react';
import FeedParser from "../../services/FeedParser/";
import PropTypes from "prop-types";
import {clone, flatten, reduce, joinClassNames} from "../../services/utils";
import {updateFeeds, isLoadingFeeds} from "../../redux/actions";
import {connect} from 'react-redux';
import {LoaderSmall} from '../icons';
import Strings from '../../services/Strings/';

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

    constructor(props){
        super(props);

        this.feedHtml = this.feedHtml.bind(this);
        this.fetchFeed = this.fetchFeed.bind(this);
    }

    componentDidMount(){
        this.fetchFeed();
    }

    componentWillUnmount(){
        this.props.dispatch(isLoadingFeeds(true));
        this.props.dispatch(updateFeeds([]));
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
            }).then(feeds => {
                let key = 0;

                return flatten(feeds.map((feed) => {
                    return feed.entries.map((entry) => {
                        key += 1;

                        return this.feedHtml(key, entry, feed.meta);
                    });
                }));
            }).then(feeds => {
                if(maxFeeds >= 0){
                    this.props.dispatch(updateFeeds(reduce(feeds, maxFeeds)));
                    this.props.dispatch(isLoadingFeeds(false));
                } else {
                    this.props.dispatch(updateFeeds(feeds));
                    this.props.dispatch(isLoadingFeeds(false));
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
                {(this.props.feeds.length > 0)
                    ? this.props.feeds
                    : (this.props.isLoadingFeeds)
                        ? <LoaderSmall/>
                        : this.props.notFoundHtml}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {feeds, isLoadingFeeds} = state;

    return {feeds, isLoadingFeeds};
};

export default connect(mapStateToProps)(Feed);