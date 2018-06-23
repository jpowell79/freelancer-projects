let expect = require('chai').expect;
const CsvParser = require('../../services/CsvParser');
const moment = require('moment');

let date = parseInt(moment().format('YYYYMMDD'), 10);

let mockHistoricData = {
    name: 'Bitcoin',
    startPrice: 6400,
    finishPrice: 6500,
    pot: 0.25,
    nrOfTrades: 900,
    date: date,
};

describe('CsvParser tests', () => {
    it('Manually check if contracts parses correctly.', () => {
        console.log(CsvParser.parse([
            mockHistoricData,
            mockHistoricData
        ]));
    });
});