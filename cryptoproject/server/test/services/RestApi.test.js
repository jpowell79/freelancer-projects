const expect = require('chai').expect;
const request = require("supertest");
const app = require('../resources/mockApp');
const urls = require('../../services/utils/urls');

describe('Rest API', () => {
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

    it(`Should not send email with a POST request to ${urls.email} using invalid grecaptcha`, (done) => {
        request(app)
            .post(urls.email)
            .send({
                name: 'Foo',
                email: 'Foo@example.com',
                website: '',
                message: '',
                grecaptcha: 'bar'
            })
            .end((err, res) => {
                expect(res.body.emailSendData.error).to.be.equal('Grecaptcha not verified.');
                expect(res.body.grecaptchaValidation.success).to.be.equal(false);
                done();
            });
    }).timeout(10000);

    it(`Should not send email with a POST request to ${urls.email} when name or email is left blank`, (done) => {
        request(app)
            .post(urls.email)
            .send({
                name: '',
                email: '',
                website: '',
                message: '',
                grecaptcha: 'bar'
            })
            .end((err, res) => {
                expect(res.body.emailSendData.error).to.be.equal('Invalid fields detected.');
                expect(res.body.fields.errors.length).to.be.equal(2);
                done();
            });
    }).timeout(10000);
});