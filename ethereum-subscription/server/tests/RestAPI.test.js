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

    describe(`${urls.settings}`, () => {
        it('Should not allow GET without name specified', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}`))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(400);
                    done();
                });
        }).timeout(1000 * 10);

        it('Should get setting with existing name', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}/${mocks.setting.name}`))
                .then(response => {
                    console.log(response.body.value);
                    expect(response.status).to.be.equal(200);
                    done();
                });
        }).timeout(1000 * 10);

        it('Should return status of 404 if setting is not found', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}/DoesNotExist`))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(404);
                    done();
                });
        }).timeout(1000 * 10);

        it('Should not allow empty name in POST', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: null,
                    value: true
                }))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(400);
                    done();
                });
        });

        it('Should not allow creating setting with existing name', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: mocks.setting.name,
                    value: true
                }))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(400);
                    done();
                });
        });

        it('Should create setting with unique name.', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: 'UniqueSetting',
                    value: true
                }))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(200);
                    done();
                });
        });

        it('Should not update unexisting setting', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: 'AnotherUnexistingSetting',
                    value: false,
                    update: true
                }))
                .then(response => {
                    console.log(response.text);
                    expect(response.status).to.be.equal(404);
                    done();
                });
        });

        it('Should update existing setting with update true', (done) => {
            setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: 'AnotherSetting',
                    value: false
                }))
                .then(() => request(app).get(`${urls.settings}/AnotherSetting`))
                .then(response => {
                    expect(response.body.value).to.be.equal('0');

                    return request(app).post(urls.settings).send({
                        name: 'AnotherSetting',
                        value: true,
                        update: true
                    });
                })
                .then(() => request(app).get(`${urls.settings}/AnotherSetting`))
                .then(response => {
                    expect(response.body.value).to.be.equal('1');
                    done();
                });
        });
    });

    describe(`${urls.users}`, () => {
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