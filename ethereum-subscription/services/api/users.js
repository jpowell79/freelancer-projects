const axios = require('axios');
const {urls, roles} = require('../constants');

const getSupplier = async (username) => {
    return axios.get(`${urls.users}/${username}`);
};

const registerSupplier = async ({username, email, password, walletAddress}) => {
    return axios.post(urls.users, {
        username,
        email,
        password,
        role: roles.supplier,
        walletAddress,
        grecaptcha: grecaptcha.getResponse()
    });
};

const suspendSupplier = async ({username}) => {
    return axios.delete(urls.users, {
        params: {username}
    });
};

const updateSupplier = async ({originalUsername, username, email, password}) => {
    return axios.post(urls.users, {
        originalUsername,
        username,
        email,
        password,
        update: true
    });
};

module.exports = {
    registerSupplier,
    suspendSupplier,
    getSupplier,
    updateSupplier
};