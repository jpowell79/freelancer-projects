/*----------------------------------------
 * Smart Contracts
 *----------------------------------------*/
module.exports.CONTRACT_ADDRESSES = [
    '0xf4e3adc51d711e7992623e5d779904330abeb992',
    '0xea4b8d220fbec8eb8dab84e2fa043ea207ce3b0d',
    '0xeba024d127bd19bca3a6c703fb2345586f50d479',
    '0x1df822043d01c1fedf6c04dfc76e661519270624',
    '0x8d6f0a8fab8c9f9d3fbfb08cdccc084bbda51d27',
    '0x5b2eed835c6e7ed9d56c140ccac9f810c774b16a',
    '0x910f187fb9d1f7f8899177762cfc54c14b849737',
    '0xa999666814aa6c1d2ffb2140abe7c1dda49e46aa',
    '0x1dcd96cad3489c4489b80c5682cfe2fdb4f6699a',
    '0x2e6def03eb8782d3064a4ef5e16d8388a3ec807e',
    '0x2a7d90a74924507b6a2aa81e2ef2298109ca40fd',
    '0x3f4dd14742f14535356d65ddac3c9fb3bc16a032',
    '0x3c60618e2cc904790c0c54ad6890ec8739cce457',
    '0x83918d8a7f0d078fcc1e76f4078c3f426a4f13a2',
    '0x0f23dd722a785c5609d7a82072737573a04a7954',
    '0xcddb9febdf849fad7884878de7e6c4cd76daabff',
    '0x0b0f92322b9a0a93c82787b2035f8182b8312bef',
    '0x5de3a1b933e63ffa6b8e312997e12426bd55cb93',
    '0xbb65bb7301738b85de09a454dac6fd41e9359e7a',
    '0x34e16f8473ad20a51153211155823ac74afebb14',
    '0x57ba0d28bf90b18e946e5ec41e7931bd21c96c40',
    '0x9e5c87abb72515708edfdbbc795ebc8b35c918fc',
    '0x926ca09b2d3d2f5fc60ca1bad9ba8ce8f4dc9dc5',
    '0xd698e866f65b1ce5a122e7d6a1caf7a2f71e56ab',
    '0xee093b54d0c1e71c05431b075226284f8c9a45b5',
];

/*----------------------------------------
 * Contract Debug Mode
 * ---------------------------------------
 * Makes it possible to override the values
 * returned when a smart contract is
 * fetched.
 *----------------------------------------*/
module.exports.DEBUG_MODE = true; //Says if the DEBUG functions should be used or not.
module.exports.DEBUG_SMART_CONTRACT = (contract) => {
    return {
        index: contract.index,
        admin: contract.admin,
        name: contract.name,
        contractAddress: contract.contractAddress,
        rank: contract.rank,
        startPrice: contract.startPrice,
        nrOfBets: contract.nrOfBets,
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
module.exports.DEBUG_TOKEN_SALE = (tokenSale) => {
    return {
        address: tokenSale.address,
        completeTime: tokenSale.completeTime,
        amountRaised: 3975,
        maximumRaised: tokenSale.maximumRaised,
        preIcoPhaseCountdown: Date.now() + 1000 * 5,
        icoPhaseCountdown: Date.now() + 1000 * 10,
        postIcoCountdown: Date.now() + 1000 * 15
    };
};

/*----------------------------------------
 * Token holder claim address
 *----------------------------------------*/
module.exports.TOKEN_HOLDER_CLAIM_ADDRESS = '0xd473fc1cee590f3132a3f66fd5726a8dfb94740e';
module.exports.PRICING_ADDRESS = '0x44aaee348a5a0259cf2116950e4c1aadda3be41d';

/*----------------------------------------
 * Token Sale Contract
 *----------------------------------------*/
module.exports.TOKEN_SALE_CONTRACT_ADDRESS = '0x5f094cdf82ea309fef7b37ee8b021c2b0935308d';

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
//If left as null the server will try to use the default IPv4 address as a Proxy instead.
module.exports.PROXY = null;


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
 * Crypto Data Service
 * ---------------------------------------*/
module.exports.ENABLE_CRYPTO_DATA_SERVICE = true;
module.exports.CRYPTO_DATA_SERVICE_REFRESH_RATE = 1000 * 30; //Milliseconds

/*----------------------------------------
 * Snapshot Service
 * ---------------------------------------
 * Runs in the background and saves information
 * from smart contracts into the historical
 * database when their extended time expires.
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
module.exports.LOWEST_ETH = 0.05;


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
 * Contact Form validation
 *----------------------------------------*/
module.exports.MAX_NAME_LENGTH = 64;
module.exports.MAX_EMAIL_LENGTH = 64;
module.exports.MAX_WEBSITE_LENGTH = 64;
module.exports.MAX_MESSAGE_LENGTH = 512;


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