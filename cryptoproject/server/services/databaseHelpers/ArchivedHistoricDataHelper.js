const ArchivedHistoricData = require('../../models/archived-historic-data');
const moment = require('moment');

async function create(data, dateCreated = 0){
    let date = (dateCreated !== 0) ? dateCreated : data.date;

    let archivedHistoricData = new ArchivedHistoricData({
        name: data.name,
        startPrice: data.startPrice,
        finishPrice: data.finishPrice,
        pot: data.pot,
        nrOfBets: data.nrOfBets,
        date: date
    });

    return archivedHistoricData.save();
}

async function removeAll(){
    return ArchivedHistoricData.find()
        .exec()
        .then(response => {
            return Promise.all(response.map(data => {
                return ArchivedHistoricData.deleteOne({_id: data._id}).exec();
            }));
        })
        .then(() => {
            return ArchivedHistoricData.resetCount(() => {});
        });
}

module.exports = {
    create,
    removeAll,
};