const ArchivedHistoricDataHelper = require('./ArchivedHistoricDataHelper');
const HistoricDataHelper = require('./HistoricDataHelper');
const CryptoData = require('../../models/crypto-data');
const log = require('../utils/log');

function cleanDatabase(){
    log.sectionTitle('Cleaning Database');
    console.log('Removing historic data...');
    return HistoricDataHelper.removeAll()
        .then(() => {
            console.log('Removing archived historic data...');
            return ArchivedHistoricDataHelper.removeAll()
        })
        .then(() => {
            console.log('Removing crypto data...');
            return CryptoData.find().exec();
        }).then(response => {
            return Promise.all(response.map(data => {
                return CryptoData.deleteOne({_id: data._id}).exec();
            }));
        }).then(() => {
            log.endOfSection();
        });
}

module.exports = {
    cleanDatabase
};