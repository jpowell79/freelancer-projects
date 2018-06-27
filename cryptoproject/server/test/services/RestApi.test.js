const expect = require('chai').expect;
const request = require("supertest");
const getApp = require('../resources/getApp');
const urls = require('../../services/utils/urls');

describe('Rest API', () => {
    it(`GETS ${urls.historicData}`, (done) => {
        getApp().then(app => {
            request(app).get(urls.historicData)
                .expect(200)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    app.close(done);
                });
        });
    }).timeout(10000);

    it(`GETS ${urls.archivedHistoricData}`, (done) => {
        getApp().then(app => {
            request(app).get(urls.archivedHistoricData)
                .expect(200)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    app.close(done);
                });
        });
    }).timeout(10000);

    it(`GETS ${urls.archivedHistoricData}/20170502-20180602`, (done) => {
        getApp().then(app => {
            request(app).get(urls.archivedHistoricData + '/20170502-20180602')
                .expect(200)
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(200);
                    app.close(done);
                });
        });
    }).timeout(10000);
});