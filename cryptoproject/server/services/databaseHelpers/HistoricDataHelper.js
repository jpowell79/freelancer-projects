const HistoricData = require('../../models/historic-data');

async function create(smartContract){
    let historicData = new HistoricData({
        name: smartContract.name,
        startPrice: smartContract.startPrice,
        finishPrice: smartContract.finishPrice,
        pot: smartContract.pot,
        nrOfTrades: smartContract.nrOfTrades
    });

    return historicData.save();
}

async function removeAll(){
    return HistoricData.find()
        .exec()
        .then(response => {
            return Promise.all(response.map(data => {
                return HistoricData.deleteOne({_id: data._id}).exec();
            }));
        })
        .then(() => {
            return HistoricData.resetCount(() => {});
        });
}

module.exports = {
    create,
    removeAll
};