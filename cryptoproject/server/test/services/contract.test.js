const expect = require('chai').expect;
const contract = require('../../services/contract');

describe('Dividend Contract tests', () => {
    it('Returns expected types', (done) => {
        contract.fetchDividendContract().then(response => {
            expect(response).to.be.an('object');
            expect(response.address).to.be.a('string');
            expect(response.totalTokenSupply).to.be.a('number');
            expect(response.claimWindowIsOpen).to.be.a('boolean');
            expect(response.closeTime).to.be.a('number');
            expect(response.openTime).to.be.a('number');
            expect(response.value).to.be.a('number');
            expect(response.block).to.be.a('number');
            done();
        });
    }).timeout(1000 * 10);
});