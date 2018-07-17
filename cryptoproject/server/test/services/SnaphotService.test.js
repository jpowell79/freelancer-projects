const expect = require('chai').expect;
const rewire = require('rewire');
const sinon = require('sinon');
const moment = require('moment');
const SnapshotService = rewire('../../services/SnapshotService');

const generateContracts = (extendedTime, amount) => {
    let contracts = [];

    for(let i = 0; i < amount; i++){
        contracts.push({
            index: 0,
            admin: '',
            name: 'foo ' + i,
            contractAddress: '',
            rank: 0,
            startPrice: 0,
            nrOfBets: 0,
            standardTimeCloses: 0,
            extendedTimeCloses: extendedTime,
            pot: 0
        });
    }

    return contracts;
};

const mockFetchContracts = (contracts) => {
    let fetchAllCryptoContracts = sinon.fake.resolves(contracts);
    SnapshotService.__set__("fetchAllCryptoContracts", fetchAllCryptoContracts);
};

const mockGetRetrievalTime = (retrievalTime) => {
    let getFinishPriceRetrievalTime = sinon.fake.resolves(retrievalTime);
    SnapshotService.__set__("getFinishPriceRetrievalTime", getFinishPriceRetrievalTime);
};

const mockAxiosGet = () => {
    let axiosGet = sinon.fake.resolves({
        data: {
            data: {
                '1': {
                    name: 'foo 0',
                    quotes: {
                        USD: {
                            price: 5
                        }
                    }
                }
            }
        }
    });
    SnapshotService.__set__("axiosGet", axiosGet);
};

const mockCreateHistoricData = () => {
    let createHistoricData = sinon.fake.resolves();
    SnapshotService.__set__("createHistoricData", createHistoricData);
};

describe('SnapshotService', () => {
    it('Should not watch contracts with expired extendedTime', (done) => {
        mockFetchContracts(generateContracts(0, 0));
        let snapshotService = new SnapshotService();

        snapshotService.launch({}).then(() => {
            expect(snapshotService.extendedTimeWatcher.isWatching()).to.be.equal(false);
            done();
        });
    });

    it('Should watch contracts with extendedTime not yet expired.', (done) => {
        mockFetchContracts(generateContracts(Date.now() + 100, 1));
        let snapshotService = new SnapshotService();

        snapshotService.launch({}).then(() => {
            expect(snapshotService.extendedTimeWatcher.isWatching()).to.be.equal(true);
            return snapshotService.stop();
        }).then(() => {
            expect(snapshotService.extendedTimeWatcher.isWatching()).to.be.equal(false);
            done();
        });
    }).timeout(5000);

    it('Should call onExpiringExtendedTime when extended time expires', (done) => {
        mockFetchContracts(generateContracts(Date.now() + 100, 1));
        mockGetRetrievalTime(0);

        let snapshotService = new SnapshotService();
        snapshotService.retrievalTimeWaitInterval = 10;

        snapshotService.launch({
            onExpiringExtendedTime: (contract) => {
                expect(contract.name).to.be.equal('foo 0');
                expect(snapshotService.retrievalTimeWatcher.isWatching()).to.be.equal(false);
                snapshotService.stop().then(() => {
                    done();
                });
            }
        });
    }).timeout(5000);

    it('Should add valid retrieval times after expiring extended time', (done) => {
        mockFetchContracts(generateContracts(Date.now() + 100, 1));
        mockGetRetrievalTime(Date.now() + 1000 * 10);

        let snapshotService = new SnapshotService();

        snapshotService.launch({
            onExpiringExtendedTime: () => {
                expect(snapshotService.retrievalTimeWatcher.isWatching()).to.be.equal(true);
                snapshotService.stop().then(() => {
                    done();
                });
            }
        });
    }).timeout(5000);

    it('Should call onSnapShotSaved when retrieval time expires', (done) => {
        mockFetchContracts(generateContracts(Date.now() + 100, 1));
        mockGetRetrievalTime(Date.now() + 1000);
        mockAxiosGet();
        mockCreateHistoricData();

        let snapshotService = new SnapshotService();

        snapshotService.launch({
            onExpiringExtendedTime: () => {
                expect(snapshotService.retrievalTimeWatcher.isWatching()).to.be.equal(true);
            },
            onSnapshotSaved: (contract, finishPrice) => {
                expect(contract.name).to.be.equal('foo 0');
                expect(finishPrice).to.be.equal(5);

                snapshotService.stop().then(() => {
                    expect(snapshotService.retrievalTimeWatcher.isWatching()).to.be.equal(false);
                    expect(snapshotService.extendedTimeWatcher.isWatching()).to.be.equal(false);
                    done();
                });
            }
        });
    }).timeout(5000);

    it('Should relaunch without modifying initial launch settings.', (done) => {
        mockFetchContracts(generateContracts(Date.now() + 100, 1));
        mockGetRetrievalTime(0);

        let snapshotService = new SnapshotService();

        snapshotService.launch({
            onSnapshotSaved: () => { return 'Foo' },
            onExpiringExtendedTime: () => { return 'Bar' }
        });

        snapshotService.reLaunch().then(() => {
            expect(snapshotService.onSnapshotSaved()).to.be.equal('Foo');
            expect(snapshotService.onExpiringExtendedTime()).to.be.equal('Bar');
            return snapshotService.stop();
        }).then(() => {
            done();
        });
    }).timeout(5000);
});