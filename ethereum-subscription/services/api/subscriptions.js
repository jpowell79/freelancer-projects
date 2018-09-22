const axios = require("axios");
const {urls} = require("../constants");

const addSubscription = async ({subscriberAddress, contractAddress, transactionHash}) => {
    return axios.post(urls.subscriptions, {
        subscriberAddress,
        contractAddress,
        transactionHash
    });
};

const deleteSubscription = async ({subscriptionId}) => {
    return axios.post(urls.subscriptions, {
        delete: true,
        subscriptionId
    });
};

const addSubscriptionContract = async ({address, details, ownerUsername, typeId}) => {
    return axios.post(urls.subscriptionContracts, {
        address,
        details,
        ownerUsername,
        typeId
    });
};

const activateSubscriptionContract = async ({address}) => {
    return axios.post(urls.subscriptionContracts, {
        address,
        isActive: true,
        update: true
    })
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
    addSubscription,
    addSubscriptionContract,
    activateSubscriptionContract,
    addContractType,
    editContractType,
    deleteSubscription
};