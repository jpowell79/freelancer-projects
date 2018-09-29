const axios = require("axios");
const {urls} = require("../constants");

const addSubscription = async ({
    subscriberAddress,
    contractAddress,
    transactionHash,
    subscriberEmail
}) => {
    return axios.post(urls.subscriptions, {
        subscriberEmail,
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

const addSubscriptionContract = async ({
    address,
    details,
    ownerUsername,
    hasFreeTrials,
    typeId
}) => {
    return axios.post(urls.subscriptionContracts, {
        address,
        details,
        ownerUsername,
        hasFreeTrials,
        typeId
    });
};

const editSubscriptionContract = async ({address, hasFreeTrials, typeId, details}) => {
    return axios.post(urls.subscriptionContracts, {
        address,
        details,
        hasFreeTrials,
        typeId,
        update: true
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
    editSubscriptionContract,
    deleteSubscription
};