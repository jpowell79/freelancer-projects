const roles = require('./constants/roles');
const axios = require('axios');
const urls = require('./constants/urls');
const isEmpty = require('./datatypes/objects').isEmpty;
const {isClient} = require('./utils');

module.exports.saveUser = (req, user) => {
    req.session.user = {
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress
    };
};

module.exports.saveTempUser = (req, user, uuid) => {
    req.session.tempUser = {
        username: user.username,
        password: user.password,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        uuid: uuid
    };
};

module.exports.isLoggedIn = async (req) => {
    if(isClient()) return axios.get(urls.sessions).then(
        response => !isEmpty(response.data)
    );

    return !isEmpty(req.session.user);
};

module.exports.isLoggedInAdmin = async (req) => {
    return module.exports.isLoggedIn(req)
        .then(loggedIn => {
            if(loggedIn){
                if(isClient()){
                    return axios.get(urls.sessions).then(
                        response => response.data.role === roles.admin
                    );
                } else {
                    return req.session.user.role === roles.admin;
                }
            }

            return false;
        });
};