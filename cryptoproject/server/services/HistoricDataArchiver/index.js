'use strict';

const HistoricData = require('../../models/historic-data');
const ArchivedHistoricDataHelper = require('../../services/databaseHelpers/ArchivedHistoricDataHelper');
const moment = require('moment');

function archiveDataOlderThan(days){
    let daysInMilliseconds = (1000 * 60 * 60 * 24) * days;
    let oldHistoricData;

    return HistoricData.find().exec().then(historicData => {
        return historicData.filter(data =>
            new Date(data.timestamp).getTime() + daysInMilliseconds < Date.now()
        )
    }).then(oldData => {
        oldHistoricData = oldData;

        return Promise.all(oldHistoricData.map(data =>
            HistoricData.deleteOne({_id: data._id}).exec()
        ));
    }).then(() => {
        return Promise.all(oldHistoricData.map(data => {
            ArchivedHistoricDataHelper.create(
                data,
                parseInt(moment(data.timestamp).format('YYYYMMDD'), 10)
            );
        }));
    });
}

module.exports = {
    archiveDataOlderThan
};