const expect = require('chai').expect;
const request = require("supertest");
const app = require('../resources/mockApp');
const urls = require('../../services/utils/urls');

describe('Rest API', () => {
    it(`Should return 403 with unexpected url`, (done) => {
        request(app).get('FooBar')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(403);
                done();
            });
    }).timeout(10000);

    it(`GETS ${urls.historicData}`, (done) => {
        request(app).get(urls.historicData)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    }).timeout(10000);

    it(`GETS ${urls.archivedHistoricData}`, (done) => {
        request(app).get(urls.archivedHistoricData)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    }).timeout(10000);

    it(`GETS ${urls.archivedHistoricData}/20170502-20180602`, (done) => {
        request(app).get(urls.archivedHistoricData + '/20170502-20180602')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            });
    }).timeout(10000);
});