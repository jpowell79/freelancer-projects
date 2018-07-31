const expect = require('chai').expect;
const request = require("supertest");
const setupOrGetMockApp = require('./resources/mockApp');
const urls = require('../../services/constants/urls');
const random = require('../../services/utils').random;
const mocks = require('./resources/mocks');
const roles = require('../../services/constants/roles');

const checkSuccess = (response) => {
    console.log(response.text);
    expect(response.status).to.be.equal(200);
};

const checkBadRequest = (response) => {
    console.log(response.text);
    
    if(!response.text.startsWith('Error:')){
        expect(response.status).to.be.equal(400);
    }
};

const checkNotExists = (response) => {
    console.log(response.text);
    expect(response.status).to.be.equal(404);
};

describe('Rest API', () => {
    it(`Should return status code of 200 when making GET requests to gettable urls.`, () => {
        const gettableUrls = [
            urls.users,
            urls.sessions,
            urls.settings
        ];

        return setupOrGetMockApp()
            .then(app => Promise.all(gettableUrls.map(url => request(app).get(url))))
            .then(responses => {
                responses.forEach(response => {
                    expect(response.status).to.be.equal(200);
                });
            });
    }).timeout(1000 * 10);

    describe(urls.sessions, () => {
        it('Should not login with unexisting username', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(`${urls.sessions}`)
                    .send(Object.assign({}, mocks.user, {
                        username: mocks.user.username + 'foo'
                    })))
                .then(checkBadRequest);
        }).timeout(1000 * 10);

        it('Should not login with invalid password', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(`${urls.sessions}`)
                    .send(Object.assign({}, mocks.user, {
                        password: mocks.user.password + 'foo'
                    })))
                .then(checkBadRequest);
        }).timeout(1000 * 10);
    });

    describe(`${urls.settings}`, () => {
        it('Should get all settings without parameters', () => {
            return setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}`))
                .then(response => {
                    console.log(response.body);
                    expect(response.status).to.be.equal(200);
                });
        }).timeout(1000 * 10);

        it('Should get setting with existing name', () => {
            return setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}/${mocks.setting.name}`))
                .then(response => {
                    console.log(response.body.value);
                    expect(response.status).to.be.equal(200);
                });
        }).timeout(1000 * 10);

        it('Should return status of 404 if setting is not found', () => {
            return setupOrGetMockApp()
                .then(app => request(app).get(`${urls.settings}/DoesNotExist`))
                .then(checkNotExists);
        }).timeout(1000 * 10);

        it('Should not allow empty name in POST', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: null,
                    value: true
                }))
                .then(checkBadRequest);
        });

        it('Should not allow creating setting with existing name', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: mocks.setting.name,
                    value: true
                }))
                .then(checkBadRequest);
        });

        it('Should create setting with unique name.', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: 'UniqueSetting',
                    value: true
                }))
                .then(checkSuccess);
        });

        it('Should not update unexisting setting', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.settings).send({
                    name: 'AnotherUnexistingSetting',
                    value: false,
                    update: true
                }))
                .then(checkNotExists);
        });

        it('Should update existing setting with update true', () => {
            return setupOrGetMockApp()
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
                });
        });
    });

    describe(`${urls.users}`, () => {
        const mockUser = Object.assign({}, mocks.user, {
            username: 'VeryUniqueUsername'
        });

        const testBadRequestPostUser = (user) => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(user))
                .then(checkBadRequest);
        };

        it('Should not allow empty username', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty password', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                password: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty walletAddress', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                walletAddress: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty role', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                role: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow empty email', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                email: null
            }));
        }).timeout(1000 * 10);

        it('Should not allow non string password', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                password: 55555555555555
            }));
        }).timeout(1000 * 10);

        it('Should not allow too short of a password', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                password: '4'
            }));
        }).timeout(1000 * 10);

        it('Should not allow walletAddress not starting with 0x', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                walletAddress: 'BBB736a9bACC8855531AeF429735D477D4b5A4D208'
            }));
        }).timeout(1000 * 10);

        it('Should not allow walletAddress too long walletAddress', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D2088'
            }));
        }).timeout(1000 * 10);

        it('Should not allow walletAddress not too short walletAddress', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D20'
            }));
        }).timeout(1000 * 10);

        it('Should not allow unknown role', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: `Foo${random(0, 1000)}`,
                role: 'foo'
            }));
        }).timeout(1000 * 10);

        it('Should not allow malformed email', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: `Foo${random(0, 1000)}`,
                email: 'foo@example.'
            }));
        }).timeout(1000 * 10);

        it('Should not allow too short username', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: 'a'
            }));
        }).timeout(1000 * 10);

        it('Should not allow too long of a username', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: '4'.repeat(5000)
            }));
        }).timeout(1000 * 10);

        it('Should not allow username with special characters aside from _ and -', () => {
            return testBadRequestPostUser(Object.assign({}, mockUser, {
                username: 'Yp&%¤¤#'
            }));
        }).timeout(1000 * 10);

        it('Should create unexisting user.', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(mockUser))
                .then(checkSuccess);
        }).timeout(1000 * 10);

        it('Should not allow creating unexisting user.', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(mocks.user))
                .then(checkBadRequest);
        }).timeout(1000 * 10);

        it('Should not allow creating unexisting admin user.', () => {
            return setupOrGetMockApp()
                .then(app => request(app).post(urls.users).send(Object.assign({}, mockUser, {
                    username: 'VeryUniqueAdminUsername',
                    role: roles.admin
                })))
                .then(checkBadRequest);
        }).timeout(1000 * 10);
    });
});