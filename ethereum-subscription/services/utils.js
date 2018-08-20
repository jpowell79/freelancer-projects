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

module.exports.ethToWei = (eth) => {
    return eth * 1000000000000000000;
};

module.exports.weiToEth = (wei) => {
    return wei/1000000000000000000;
};

module.exports.sleep = async (length) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, length);
    });
};

module.exports.random = (lowest, highest) => {
    return Math.floor((Math.random() * highest) + lowest);
};