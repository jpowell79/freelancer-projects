const axios = require('axios');
const {urls, mailTypes} = require('../constants');

const sendRequestSubscriptionMails = async ({
    supplierEmail,
    subscriberEmail,
    subscriptionName
}) => {
    return axios.post(`${urls.email}/${mailTypes.requestSubscription}`, {
        supplierEmail,
        subscriberEmail,
        subscriptionName
    });
};

const sendContractRequestMail = async ({
    contactDetails,
    exitFee,
    joinFee,
    hasFreeTrials,
    subscriptionDetails,
    subscriptionLengthInWeeks,
    subscriptionName,
    subscriptionPrice,
    subscriptionType
}) => {
    return axios.post(`${urls.email}/${mailTypes.requestContract}`, {
        contactDetails,
        exitFee,
        joinFee,
        hasFreeTrials,
        subscriptionDetails,
        subscriptionLengthInWeeks,
        subscriptionName,
        subscriptionPrice,
        subscriptionType
    });
};

const sendMassSupplierMail = async ({subject, body}) => {
    return axios.post(`${urls.email}/${mailTypes.massMailSuppliers}`, {
        subject,
        body
    });
};

const sendContractCreatedMail = async ({subscriptionName, email}) => {
    return axios.post(`${urls.email}/${mailTypes.contractCreated}`, {
        subscriptionName,
        email
    });
};

module.exports = {
    sendMassSupplierMail,
    sendContractCreatedMail,
    sendContractRequestMail,
    sendRequestSubscriptionMails
};