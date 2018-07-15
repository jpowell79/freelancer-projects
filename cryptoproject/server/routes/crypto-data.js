const urls = require('../services/utils/urls');
const CryptoData = require('../models/crypto-data');

module.exports = (server) => {
    server.get(urls.cryptoData, (req, res) => {
        CryptoData
            .find()
            .limit(1)
            .exec()
            .then(response => {
                res.send(response);
            });
    });
};