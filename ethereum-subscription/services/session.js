const roles = require('./roles');
const axios = require('axios');
const urls = require('./urls');
const isEmpty = require('./objects').isEmpty;
const {isClient} = require('./utils');

module.exports.isLoggedIn = async (req) => {
    if(isClient()) return axios.get(urls.sessions).then(
        response => !isEmpty(response.data)
    );

    return !isEmpty(req.session.user);
};

module.exports.isLoggedInAdmin = (req) => {
    return module.exports.isLoggedIn(req)
        ? req.session.user.role === roles.admin : false;
};