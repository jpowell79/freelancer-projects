const expect = require('chai').expect;
const request = require("supertest");
const setupOrGetMockApp = require('./resources/mockApp');
const urls = require('../../services/urls');
const random = require('../../services/utils').random;
const mocks = require('./resources/mocks');
const roles = require('../../services/roles');

describe('Rest API', () => {
    it(`Should return status code of 200 when making GET requests to gettable urls.`, (done) => {
        const gettableUrls = [
            urls.users
        ];

        setupOrGetMockApp()
            .then(app => Promise.all(gettableUrls.map(url => request(app).get(url))))
            .then(responses => {
                responses.forEach(response => {
                    expect(response.status).to.be.equal(200);
                });

                done();
            });
    }).timeout(1000 * 10);

    describe(`POST ${urls.users}`, () => {
        const mockUser = Object.assign({}, mocks.user, {
            username: 'VeryUniqueUsername'
        });

        const testPostUser = (done, user) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(user))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(400);
                    done();
                });
        };

        it('Should not allow empty username', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty password', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                password: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty role', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                role: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty email', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                email: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow non string password', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                password: 55555555555555
            }));
        }).timeout(1000 * 10);

        it('Should not allow too short of a password', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                password: '4'
            }));
        }).timeout(1000 * 10);

        it('Should not allow too long password', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                password: '4'.repeat(5000)
            }));
        }).timeout(1000 * 10);

        it('Should not allow unknown role', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: `Foo${random(0, 1000)}`,
                role: 'foo'
            }));
        }).timeout(1000 * 10);

        it('Should not allow malformed email', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: `Foo${random(0, 1000)}`,
                email: 'foo@example.'
            }));
        }).timeout(1000 * 10);

        it('Should not allow too short username', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: 'a'
            }));
        }).timeout(1000 * 10);

        it('Should not allow too long of a username', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: '4'.repeat(5000)
            }));
        }).timeout(1000 * 10);

        it('Should not allow username with special characters aside from _ and -', (done) => {
            testPostUser(done, Object.assign({}, mockUser, {
                username: 'Yp&%¤¤#'
            }));
        }).timeout(1000 * 10);

        it('Should create unexisting user.', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(mockUser))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(200);

                    done();
                });
        });

        it('Should not allow creating unexisting user.', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(mocks.user))
                .then(response => {
                    console.log(response.text);

                    expect(response.status).to.be.equal(400);

                    done();
                });
        });

        it('Should not allow creating unexisting admin user.', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(Object.assign({}, mockUser, {
                    username: 'VeryUniqueAdminUsername',
                    role: roles.admin
                })))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(400);

                    done();
                });
        });
    });
});