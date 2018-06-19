'use strict';

const urls = require('../services/urls');
const mongooseCrudify = require('mongoose-crudify');
const helpers = require('../services/helpers');
const HistoricalData = require('../models/historical-data');

module.exports = (server) => {
    server.use(
        urls.historicalData,
        mongooseCrudify({
            Model: HistoricalData,
            selectFields: '-__v',
            endResponseInAction: false,
            afterActions: [
                { middlewares: [helpers.formatResponse] },
            ],
        })
    );
};