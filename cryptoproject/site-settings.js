/*----------------------------------------
 * Smart Contracts
 *----------------------------------------*/
module.exports.CONTRACT_ADDRESSES = [
    '0x78936217f1886e45f623416439ddf4d37d41df43',
    '0x28472ed0be7f9e3a935a0023d786f16650ea704c',
    '0x58715117bd754174772a8d889abdd465bb40c1c1',
    '0x633dcc9713ccdff54cec0fbad407a045399f6aa0',
    '0xb956aa2b245a0c8aff10efcfe0b4e1832c7db7b0',
    '0x06ea478f7fc061910c55bf32201c9a98c1a97cd8',
    '0xc445dc809886fbfdfd8f6a8a1cd9773daba5f160',
    '0xb884d9adac3674b191d14ccc3f232a4e5a1692e3',
    '0x4e7bd5a927a0c128aecce0b820a92a1767643ac6',
    '0xcaa1ec7c3c0d4bda13eadf8b7d77fef8bfeadc79',
    '0xb3413345296827c169295e9da86f3f4ff9fbcf92',
    '0x2d5e3913c888c77b4206d7af5144ac43c56fa6c0',
    '0x429107fd9b681aa5934ab11f70340f061448f183',
    '0x28ef1ae5b7ef31583ffcb9689eb4bc3ee0ce9f39',
    '0xcd5498ad00caeeefe35c5ba6ca2815a603557930',
    '0xe10ead18b3bc04f2e52d7434e0179e0309f90189',
    '0x193dc89a770a7784d0fd349aac0f074d0bbf68a4',
    '0x6dea0ef68288654fcf907a505999701a45044cf2',
    '0x2e38a5e6229ceaaf8fd7204a07440e523b152c86',
    '0x5e37d14ddcd71495e36ce599aa9eb2ff5c6456e7',
    '0x1c5cf8fd05334a17d58527c692bf36d5effd1e4e',
    '0xfa8d9d0ce11cee006dd80f9706b10446a9292c99',
    '0xdc11833f7c3159e04dda05166cde727b4b17bf1a',
    '0xea982706208d6a63ccc2b450d9587c0bd5bf77a8',
    '0xf1e4fa00e0905b7e64dfc3e9fda68f5ba19792be'
];

/*----------------------------------------
 * Contract Debug Mode
 * ---------------------------------------
 * Makes it possible to override the values
 * returned when a smart contract is
 * fetched.
 *----------------------------------------*/
module.exports.DEBUG_MODE = false; //Says if the DEBUG functions should be used or not.
module.exports.DEBUG_SMART_CONTRACT = (contract) => {
    return {
        index: contract.index,
        admin: contract.admin,
        name: contract.name,
        contractAddress: contract.contractAddress,
        rank: contract.rank,
        startPrice: contract.startPrice,
        nrOfTrades: contract.nrOfTrades,
        standardTimeCloses: Date.now() + 1000 * 30,
        extendedTimeCloses: Date.now() + 1000 * 60,
        pot: contract.pot,
        finishPriceRetrievalTime: contract.finishPriceRetrievalTime,
        finishPrice: contract.finishPrice
    };
};

module.exports.DEBUG_TOKEN_HOLDER_CLAIM = (claim) => {
    return {
        address: claim.address,
        claimBlock: claim.claimBlock,
        claimWindowIsOpen: false,
        claimWindowNumber: claim.claimWindowNumber,
        totalEth: claim.totalEth,
        openTime: Date.now() + claim.timeUntilWindowCloses,
        closeTime: Date.now() + claim.timeUntilWindowOpens,
        claimWindowTimeOpened: claim.claimWindowTimeOpened,
        timeUntilWindowCloses: claim.timeUntilWindowCloses,
        claimWindowTimeCloses: claim.claimWindowTimeOpened,
        timeUntilWindowOpens: claim.timeUntilWindowCloses,
        totalTokenSupply: claim.totalTokenSupply
    };
};
module.exports.DEBUG_CLAIM_INFORMATION = (claimInfo) => {
    return {
        claimBlockTokenBalance: claimInfo.claimBlockTokenBalance,
        entitlementPercentage: claimInfo.entitlementPercentage,
        entitlementEth: 0.01,
        hasMadeClaim: false
    };
};
module.exports.DEBUG_FINISH_PRICE_RETRIEVAL_TIME = (finishPriceRetrievalTime) => {
    return Date.now() + 1000 * 60;
};

/*----------------------------------------
 * Token holder claim address
 *----------------------------------------*/
module.exports.TOKEN_HOLDER_CLAIM_ADDRESS = '0xbc98af5aae78f2b5842f1206558d1f1df563fe4a';
module.exports.PRICING_ADDRESS = '0x44aaee348a5a0259cf2116950e4c1aadda3be41d';


/*----------------------------------------
 * Trade Token
 *----------------------------------------*/
module.exports.TOKEN_CONTRACT = '0x3e9838C0063DB4541E1d225509662257a0baf4Fc';
module.exports.TOKEN_NAME = 'TEST777';


/*----------------------------------------
 * Server Options
 *----------------------------------------*/
module.exports.DEFAULT_PORT = 3000;
module.exports.HOST = 'localhost';
module.exports.MONGODB_URI = 'mongodb://localhost/database';


/*----------------------------------------
 * Ethereum Network Settings
 *----------------------------------------*/
module.exports.HTTP_PROVIDER = 'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv';
module.exports.ETHER_SCAN_URL = 'https://kovan.etherscan.io';


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
module.exports.ENABLE_ARCHIVER_SERVICE = true;
module.exports.ARCHIVER_REFRESH_RATE = 1000 * 60 * 60 * 24; //Milliseconds
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
 * ReCaptcha
 *----------------------------------------*/
module.exports.RECAPTCHA_SITE_KEY = '6LcVbGIUAAAAABiMl6EkPNsNUBVRC1U2l_VwR10Z';
module.exports.RECAPTCHA_SECRET_KEY = '6LcVbGIUAAAAAJebHtHYG4kFtHLaN-jeGgr6jZC8';


/*----------------------------------------
 * Email
 * https://nodemailer.com/about/
 *----------------------------------------*/
module.exports.EMAIL_SETTINGS = {
    IS_ETHEREAL_ACCOUNT: true,
    TRANSPORTER: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, //true for 465, false for other ports
        auth: {
            user: 'iobsn5ywkd34j7zf@ethereal.email',
            pass: 'vmSJNFJDweBFUG9qZb'
        },
        tls: {
            rejectUnauthorized: false
        }
    },
    //Note, it will actually send the email to an ethereal proxy server
    //during testing and not an actual email to this address.
    RECEIVER: 'smnrkssn@hotmail.se'
};


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


/*----------------------------------------
 * PageLoader
 *----------------------------------------*/
module.exports.SLOW_PAGES = [
    '/',
    '/Trade'
];