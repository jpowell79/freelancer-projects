const axios = require('axios');
const {urls} = require('../constants');

const addSubscriptionContract = async ({address, details, ownerUsername, typeId}) => {
    return axios.post(urls.subscriptionContracts, {
        address,
        details,
        ownerUsername,
        typeId
    });
};

const addContractType = async ({name}) => {
    return axios.post(urls.subscriptionTypes, {name});
};

const editContractType = async ({name, id}) => {
    return axios.post(urls.subscriptionTypes, {
        name, id, update: true
    });
};

module.exports = {
    addSubscriptionContract,
    addContractType,
    editContractType
};