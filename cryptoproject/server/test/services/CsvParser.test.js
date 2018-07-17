const expect = require('chai').expect;
const CsvParser = require('../../services/CsvParser');
const moment = require('moment');

let date = parseInt(moment().format('YYYYMMDD'), 10);
let parsedDate = moment(date, 'YYYYMMDD').format('YYYY-MM-DD');

let mockHistoricData = {
    name: 'Bitcoin',
    startPrice: 6400,
    finishPrice: 6500,
    pot: 0.25,
    nrOfBets: 900,
    date: date,
};

describe('CsvParser', () => {
    it('Should parse historic data correctly.', () => {
        expect(CsvParser.parse([
            mockHistoricData,
            mockHistoricData
        ])).to.be.equal(
            `${CsvParser.headings}` +
            `Bitcoin,$6400,$6500,0.25,900,${parsedDate}\n` +
            `Bitcoin,$6400,$6500,0.25,900,${parsedDate}`);
    });
});