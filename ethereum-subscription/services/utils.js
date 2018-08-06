const axios = require('axios');

module.exports.isClient = () => {
    return typeof window !== 'undefined';
};

module.exports.isServer = () => {
    return typeof window === 'undefined';
};

module.exports.serverRequest = (req, url) => {
    const session = (req) ? req.session : null;
    const host = `http://${req.headers.host}`;

    return axios({
        method: 'get',
        url: host + url,
        credentials: 'same-origin',
        data: {'session': session}
    });
};

module.exports.random = (lowest, highest) => {
    return Math.floor((Math.random() * highest) + lowest);
};