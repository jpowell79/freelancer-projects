'use strict';

const urls = require('../services/utils/urls');
const ArchivedHistoricData = require('../models/archived-historic-data');
const settings = require('../../site-settings');

function onDatesRequested(from, to, res){
    ArchivedHistoricData
        .find()
        .where('date').gte(from).lte(to)
        .limit(settings.ARCHIVED_DATA_RESPONSE_LIMIT)
        .sort({date: -1})
        .exec()
        .then(response => {
            res.send(response);
        });
}

function onNormalRequest(res){
    ArchivedHistoricData
        .find()
        .limit(settings.ARCHIVED_DATA_RESPONSE_LIMIT)
        .sort({_id: 1})
        .exec()
        .then(response => {
            res.send(response);
        });
}

module.exports = (server) => {
    server.use(urls.archivedHistoricData + '(/:from-:to)?', (req, res) => {
        let {from, to} = req.params;

        if(from !== undefined && to !== undefined){
            onDatesRequested(from, to, res);
        } else {
            onNormalRequest(res);
        }
    });
};