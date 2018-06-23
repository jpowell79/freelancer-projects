const random = require('../utils/random');
const moment = require('moment');
const settings = require('../../../site-settings');

const generateDummyHistoricData = () => {
    return {
        name: `Crypto ${random(1, 10000)}`,
        startPrice: random(1, 10000),
        finishPrice: random(1, 10000),
        pot: random(1, 100)/100,
        nrOfTrades: random(0, 1200)
    }
};

const generateDummyArchivedHistoricData = () => {
    return {
        name: `Crypto ${random(1, 10000)}`,
        startPrice: random(1, 10000),
        finishPrice: random(1, 10000),
        pot: random(1, 100)/100,
        nrOfTrades: random(0, 1200),
        date: parseInt(
            moment(Date.now() - 1000 * 60 * 60 * 24 *
                random(settings.ARCHIVE_DATA_OLDER_THAN.days, 900)
            ).format('YYYYMMDD'), 10
        )
    }
};

const getDummyHistoricData = (amountToGenerate) => {
    let dummyData = [];

    for(let i = 0; i < amountToGenerate; i++){
        dummyData.push(generateDummyHistoricData());
    }

    return dummyData;
};

const getDummyArchivedHistoricData = (amountToGenerate) => {
    let dummyData = [];

    for(let i = 0; i < amountToGenerate; i++){
        dummyData.push(generateDummyArchivedHistoricData());
    }

    return dummyData;
};

module.exports = {
    getDummyHistoricData,
    getDummyArchivedHistoricData
};