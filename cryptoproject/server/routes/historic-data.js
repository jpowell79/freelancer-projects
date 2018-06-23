'use strict';

const urls = require('../services/utils/urls');
const HistoricData = require('../models/historic-data');

module.exports = (server) => {
    server.use(urls.historicData, (req, res) => {
        HistoricData
            .find()
            .limit(100)
            .sort({_id: 1})
            .exec()
            .then(response => {
                res.send(response);
            });
    });
};