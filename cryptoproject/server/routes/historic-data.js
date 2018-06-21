'use strict';

const urls = require('../services/utils/urls');
const mongooseCrudify = require('mongoose-crudify');
const helpers = require('../services/utils/helpers');
const HistoricData = require('../models/historic-data');

module.exports = (server) => {
    server.use(
        urls.historicData,
        mongooseCrudify({
            Model: HistoricData,
            identifyingKey: '_id',
            selectFields: '-__v',
            endResponseInAction: false,
            afterActions: [
                { middlewares: [helpers.formatResponse] },
            ],
        })
    );
};