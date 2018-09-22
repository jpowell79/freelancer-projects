const {round} = require("lodash/math");
const axios = require("axios");

module.exports.isClient = () => {
    return typeof window !== "undefined";
};

module.exports.isServer = () => {
    return typeof window === "undefined";
};

module.exports.serverRequest = (req, url) => {
    const session = (req) ? req.session : null;
    const host = `http://${req.headers.host}`;

    return axios({
        method: "get",
        url: host + url,
        credentials: "same-origin",
        data: {"session": session}
    });
};

module.exports.bindAllMethods = (instance, classInstance) => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(name => {
            const method = instance[name];
            return !(!(method instanceof Function) || method === classInstance);
        });

    methods.forEach(method => instance[method] = instance[method].bind(instance));
};

module.exports.ethToWei = (eth) => {
    return eth * 1000000000000000000;
};

module.exports.weiToEth = (wei, decimals = 3) => {
    return round(wei/1000000000000000000, decimals);
};

module.exports.sleep = async (length) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, length);
    });
};

module.exports.round = (numberOrString, decimals = 2) => {
    const number = parseFloat(numberOrString);
    return parseFloat(number.toFixed(decimals));
};

module.exports.random = (lowest, highest) => {
    return Math.floor((Math.random() * highest) + lowest);
};