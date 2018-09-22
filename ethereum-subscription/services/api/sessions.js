const axios = require("axios");
const {urls} = require("../constants");

const login = async ({username, password}) => {
    return axios.post(urls.sessions, {username, password});
};

const logout = async () => {
    return axios.delete(urls.sessions);
};

module.exports = {
    login,
    logout
};