import {reduce} from "../utils/index";

class FeedParser {
    constructor(feeds){
        this.feeds = feeds;

        this.parse = this.parse.bind(this);
        this.filterFor = this.filterFor.bind(this);
        this.reduceFeed = this.reduceFeed.bind(this);
    }

    parse(amountToReduce = -1, queries = []){
        if(queries.length !== 0){
            this.filterFor(queries);
        }

        if(amountToReduce >= 0){
            this.reduceFeed(amountToReduce);
        }
    }

    static includesAnyQuery(queries, string){
        for(let i = 0; i < queries.length; i++){
            if(string.includes(queries[i])){
                return true;
            }
        }

        return false;
    }

    filterFor(queries){
        this.feeds.entries = this.feeds.entries.filter(entry =>
            FeedParser.includesAnyQuery(queries, entry.title)
                || FeedParser.includesAnyQuery(queries, entry.description)
        );
    }

    reduceFeed(amountToReduce){
        this.feeds.entries = reduce(this.feeds.entries, amountToReduce);
    }
}

export default FeedParser;