const axios = require("axios");
const {urls, roles, actions} = require("../constants");

const getSuspendedSuppliers = async () => {
    return axios.post(`${urls.users}/${actions.suspendSupplier}`);
};

const suspendSupplier = async ({username}) => {
    return axios.post(`${urls.users}/${actions.suspendSupplier}`, {username});
};

const unsuspendSupplier = async ({username}) => {
    return axios.post(`${urls.users}/${actions.unsuspendSupplier}`, {username});
};

const restorePassword = ({password}) => {
    return axios.post(`${urls.users}/restorePassword`, {password});
};

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

const removeSupplier = async ({username}) => {
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
    getSuspendedSuppliers,
    suspendSupplier,
    unsuspendSupplier,
    registerSupplier,
    removeSupplier,
    getSupplier,
    updateSupplier,
    restorePassword
};