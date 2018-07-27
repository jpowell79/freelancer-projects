const roles = require('./roles');
const axios = require('axios');
const urls = require('./urls');
const isEmpty = require('./objects').isEmpty;

module.exports.isLoggedIn = async (req = null) => {
    if(!req) return axios.get(urls.sessions).then(user => !isEmpty(user));

    return req.session.user && req.session.cookie;
};

module.exports.isLoggedInAdmin = (req) => {
    return module.exports.isLoggedIn(req)
        ? req.session.user.role === roles.admin : false;
};