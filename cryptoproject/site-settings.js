/*----------------------------------------
 * Smart Contracts
 *----------------------------------------*/
module.exports.CONTRACT_ADDRESSES = [
    '0x68469e2b07baa06ae497a8d40820ef6bf9388f07',
    '0x1848ae70600f1d325a05dbe52761d75018843f83',
    '0x28c944750cfdc1f814f48dd7c1cf695187495c11',
    '0x6baaede72d6a2cfd830b1baf39de6a4abd9d658b',
    '0x1655f780e8a9e28e125b6b8d387936c480ab4cc7',
    '0x2e7696c6eed9f9280c8c89cf1317eff8ffd40873',
    '0x271b39c7473a6ba36991ca8c95cb0d59f4969afe',
    '0x09ef0ea67dbf622241f3327c7cdc9a93de9d981c',
    '0x0b6e5b76d7e65b379991371062ad80991264d04d',
    '0xb7608f40b81988b16d83f5d6b0885511868866aa',
    '0x5f5626f11a997e5eb05536e0f36b32e7007af59b',
    '0x035e45b1a047a7bdf3cc2f82eb709e4f61ffeaf0',
    '0x22abc898d9781fa65425fbe160ba90da65a03f68',
    '0x699c3eb8fae7138cc5cada432affc2e643f88966',
    '0x67d44cc5fa10315d662f38fa7ef27bddbc4493a7',
    '0x60a7acb7a8abb956eb56b91792a938a6325523f7',
    '0x7c1c3d0d876c83ac2d586b9955f68c4c5cf0e4e2',
    '0x5e285f2735da40c15616ee26fa73e4d14f27db73',
    '0x5904a96b8ca260fd4710c3ff6ed5976ff00a641f',
    '0x1ed36af73c1e1ba30562db21f2b9484940434c26',
    '0x058da8092b2a36a332dda908adc7dca7d10de42e',
    '0xb8452e80142a22f19d0081a78b422c75cb342d44',
    '0xb639ccbca4a09879b125e6b797eaa6213ee7a1e7',
    '0xedc75522c5fe7a1affe870bd2b7f987cf6da340c',
    '0x2f024aa47c01809f5ecaed8c03507f9609903d37'
];

/*----------------------------------------
 * Server Options
 *----------------------------------------*/
module.exports.DEFAULT_PORT = 3000;
module.exports.MONGODB_URI = 'mongodb://localhost/database';

/*----------------------------------------
 * Web3 Development Settings
 *----------------------------------------*/
module.exports.TOKEN_CONTRACT = '0xe69faa73b3bb4cfca6cd83c1a8bfe52cbeb5877d';
module.exports.HTTP_PROVIDER = 'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv';

/*----------------------------------------
 * Misc. Database Options
 *----------------------------------------*/
module.exports.REMOVE_DATABASE = false; //On server start
module.exports.ARCHIVED_DATA_RESPONSE_LIMIT = 10000;

/*----------------------------------------
 * Dummy Database
 * ---------------------------------------
 * Replaces the existing /database with one
 * containing randomized data.
 * The generated archived historic data
 * will have a date older than the
 * ARCHIVE_DATA_OLDER_THAN option.
 *----------------------------------------*/
module.exports.LOAD_DUMMY_DATABASE = false; //On server start
module.exports.DUMMY_HISTORIC_DATA_TO_GENERATE = 20;
module.exports.DUMMY_ARCHIVED_HISTORIC_DATA_TO_GENERATE = 2000;

/*----------------------------------------
 * Historic Data Archiver
 * ---------------------------------------
 * Archives data older than a specific
 * amount of days.
 *----------------------------------------*/
module.exports.ENABLE_ARCHIVE_OLD_DATA = false; //On server start
module.exports.ARCHIVE_DATA_OLDER_THAN = { days: 7 };

/*----------------------------------------
 * Snapshot Service
 * ---------------------------------------
 * Runs in the background and saves information
 * from smart contracts into the historical
 * database when their standard time expires.
 *----------------------------------------*/
module.exports.ENABLE_SNAPSHOT_SERVICE = true;

//Says how often the snapshot service should update it's known smart contracts.
module.exports.SNAPSHOT_SERVICE_REFRESH_RATE = 1000 * 60 * 60; //Milliseconds

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