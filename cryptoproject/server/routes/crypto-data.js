const urls = require('../services/utils/urls');
const CryptoData = require('../models/crypto-data');

module.exports = (server) => {
    server.get(urls.cryptoData, (req, res) => {
        if(req.db === null){
            res.send('Database not connected.');
            return;
        }

        CryptoData
            .find()
            .limit(1)
            .exec()
            .then(response => {
                res.send(response);
            });
    });
};