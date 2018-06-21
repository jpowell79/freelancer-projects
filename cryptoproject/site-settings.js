/*----------------------------------------
 * Smart Contracts
 *----------------------------------------*/
module.exports.CONTRACT_ADDRESSES = [
    '0x25ca14bd7cff6054f78e24ed4a20271b8706c9d7',
    '0xdb918f2e49557f6036cfb8b8ece49a059b9371b7',
    '0x460bcfefe032e8930593e96adefced7cf20b9036',
    '0xa05a051c5273388e43a83ddaa7e4326b56aa394d',
    '0x335c687b1c659862268dfd140a945c7d0028d798',
    '0xc32cbba58545d461f80af539005c26c7f8a1e376',
    '0x512ed6df2486ed493c9407dd24ea1f9d0cddae8f',
    '0xf878d01dbf475e4eb551fa6927ecbcfad866fddf',
    '0x6d83e8f763e0f78e7a571e7eca9dc0bd8c7ed332',
    '0x57045e0485686986c88f8785db74fc5a34c2e7e9'
];

/*----------------------------------------
 * Database Snapshot
 *----------------------------------------*/
module.exports.SNAPSHOT_CONTRACT_REFRESH_RATE = 1000 * 60 * 60; //Milliseconds

/*----------------------------------------
 * Table
 *----------------------------------------*/
module.exports.TABLE_REFRESH_RATE = 1000 * 30; //Milliseconds

/*----------------------------------------
 * Trade
 *----------------------------------------*/
module.exports.MAX_NR_OF_TRADES = 1000;
module.exports.MAX_ETH = 10;
module.exports.LOWEST_ETH = 0.1;

/*----------------------------------------
 * Feeds
 *----------------------------------------*/
//Rules for fetching Bitcoin feeds.
module.exports.MAX_BITCOIN_FEEDS = 12;
module.exports.MAX_BITCOIN_FEEDS_PER_URL = 3;

//Rules for fetching feeds other than Bitcoin.
module.exports.MAX_FEEDS = 3;
module.exports.MAX_FEEDS_PER_URL = 2;

//Determines which feeds to fetch data from and in what priority.
//The first value having the highest priority, and the last the lowest.
module.exports.FEED_URLS = [
    'https://www.coindesk.com/feed/',
    'https://cointelegraph.com/rss/',
    'https://www.reddit.com/r/CryptoCurrency/top/.rss?format=xml',
    'https://cryptopotato.com/feed/',
    'https://coinsutra.com/blog/feed/',
    'https://cryptoclarified.com/feed/'
];