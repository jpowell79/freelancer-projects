let expect = require('chai').expect;
let TimeWatcher = require('../../services/TimeWatcher/');

describe('StandardTimeWatcher', () => {
    it('Should not add times already expired', () => {
        let watcher = new TimeWatcher([Date.now()-1000], () => {});
        expect(watcher.timesToWatch.length).to.be.equal(0);
    });

    it('Should add times not yet expired', () => {
        let watcher = new TimeWatcher([Date.now()+1000], () => {});
        expect(watcher.timesToWatch.length).to.be.equal(1);
    });

    it('Should not be watching initially', () => {
        let watcher = new TimeWatcher([Date.now()+1000], () => {});
        expect(watcher.isWatching()).to.be.equal(false);
    });

    it('Should not be watching after watch is called with valid time.', () => {
        let watcher = new TimeWatcher([Date.now()+1000], () => {});
        watcher.watch();
        expect(watcher.isWatching()).to.be.equal(true);
    });

    it('Should notify when time expires', (done) => {
        let time = Date.now()+100;
        let notify = (completeTime) => {
            expect(completeTime).to.be.equal(time);
            done();
        };

        let watcher = new TimeWatcher([time], notify);
        watcher.watch();
    });
});