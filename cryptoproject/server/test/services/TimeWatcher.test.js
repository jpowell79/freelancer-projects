let expect = require('chai').expect;
let TimeWatcher = require('../../services/TimeWatcher/');

describe('TimeWatcher', () => {
    it('Should not add times already expired', () => {
        let watcher = new TimeWatcher([{
            time: Date.now()-1000,
            id: 1
        }], () => {});
        expect(watcher.objectsToWatch.length).to.be.equal(0);
    });

    it('Should add times not yet expired', () => {
        let watcher = new TimeWatcher([{
            time: Date.now()+1000,
            id: 1
        }], () => {});
        expect(watcher.objectsToWatch.length).to.be.equal(1);
    });

    it('Should not be watching initially', () => {
        let watcher = new TimeWatcher([{
            time: Date.now()+1000,
            id: 1
        }], () => {});
        expect(watcher.isWatching()).to.be.equal(false);
    });

    it('Should be watching after watch is called with valid time.', () => {
        let watcher = new TimeWatcher([{
            time: Date.now()+1000,
            id: 1
        }], () => {});
        watcher.watch();
        expect(watcher.isWatching()).to.be.equal(true);
    });

    it('Should notify when time expires', (done) => {
        let time = Date.now()+100;
        let notify = (timeObject) => {
            expect(timeObject.time).to.be.equal(time);
            done();
        };

        let watcher = new TimeWatcher([{
            time: time,
            id: 1
        }], notify);

        watcher.watch();
    }).timeout(5000);
});