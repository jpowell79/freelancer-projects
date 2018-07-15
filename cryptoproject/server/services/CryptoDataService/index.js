const fetchAllCryptoContracts = require('../contract').fetchAllCryptoContracts;
const CryptoData = require('../../models/crypto-data');
const Settings = require('../../../site-settings');

function CryptoDataService(){
    let updateCryptoData = () => {
        return fetchAllCryptoContracts()
            .then(cryptoData => {
                return CryptoData.updateOne({id: 0}, {
                    $set: {cryptoData}
                }).exec();
            }).catch(err => {
                console.error(err);
            });
    };

    let cryptoData;

    this.launch = () => {
        return fetchAllCryptoContracts()
            .then(cryptoDataResponse => {
                cryptoData = {
                    id: 0,
                    cryptoData: cryptoDataResponse
                };

                return CryptoData.find().limit(1).exec();
            }).then(data => {
                if(data.length === 0){
                    return CryptoData.create(cryptoData);
                } else {
                    return CryptoData.updateOne({id: 0}, {
                        $set: {cryptoData}
                    }).exec();
                }
            }).then(() => {
                this.timer = setTimeout(updateCryptoData, Settings.TABLE_REFRESH_RATE);
            }).catch(err => {
                console.error(err);
                process.exit(1);
            });
    };

    this.stop = () => {
        clearTimeout(this.timer);
    };
}

module.exports = CryptoDataService;