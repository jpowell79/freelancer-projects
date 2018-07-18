const expect = require('chai').expect;
const contract = require('../../services/contract');

describe('Token Holder Claim Contract tests', () => {
    it('Returns expected types', (done) => {
        contract.fetchTokenHolderClaimContract().then(response => {
            expect(response).to.be.an('object');
            expect(response.address).to.be.a('string');
            expect(response.claimBlock).to.be.a('number');
            expect(response.claimWindowIsOpen).to.be.a('boolean');
            expect(response.claimWindowNumber).be.be.a('number');
            expect(response.totalEth).to.be.a('number');
            expect(response.claimWindowTimeOpened).to.be.a('number');
            expect(response.timeUntilWindowCloses).to.be.a('number');
            expect(response.claimWindowTimeCloses).to.be.a('number');
            expect(response.timeUntilWindowOpens).to.be.a('number');
            expect(response.totalTokenSupply).to.be.a('number');
            expect(response.openTime).to.be.a('number');
            expect(response.closeTime).to.be.a('number');
            return response;
        }).then(response => {
            return contract.fetchClaimInformation(
                '0xB736a9bACC8855531AeF429735D477D4b5A4D208',
                response.claimBlock
            );
        }).then(claimInfo => {
            expect(claimInfo.claimBlockTokenBalance).to.be.a('number');
            expect(claimInfo.entitlementPercentage).to.be.a('number');
            expect(claimInfo.entitlementEth).to.be.a('number');
            expect(claimInfo.hasMadeClaim).to.be.a('boolean');
            done();
        });
    }).timeout(1000 * 10);
});


describe('Token Sale Contract tests', () => {
    it('Returns expected types', (done) => {
        contract.fetchTokenSaleContract()
            .then(tokenSale => {
                expect(tokenSale.address).to.be.a('string');
                expect(tokenSale.completeTime).to.be.a('number');
                expect(tokenSale.amountRaised).to.be.a('number');
                expect(tokenSale.maximumRaised).to.be.a('number');
                expect(tokenSale.preIcoPhaseCountdown).to.be.a('number');
                expect(tokenSale.icoPhaseCountdown).to.be.a('number');
                expect(tokenSale.postIcoCountdown).to.be.a('number');
                done();
            });
    });
});