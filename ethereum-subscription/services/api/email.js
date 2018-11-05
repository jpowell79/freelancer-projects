const axios = require("axios");
const {urls, mailTypes} = require("../constants");

const sendRestorePasswordMail = async ({username}) => {
    return axios.post(`${urls.email}/${mailTypes.restorePassword}`, {username});
};

const sendSubscriptionCancelledMails = async ({
    subscriptionName,
    supplierEmail,
    subscriberEmail,
    cancelRole
}) => {
    return axios.post(`${urls.email}/${mailTypes.subscriptionCancelled}`, {
        subscriptionName,
        supplierEmail,
        subscriberEmail,
        cancelRole
    });
};

const sendTrialStartedMail = async ({
    supplierEmail,
    subscriberEmail,
    subscriptionName,
    contractAddress,
}) => {
    return axios.post(`${urls.email}/${mailTypes.trialStarted}`, {
        supplierEmail,
        subscriberEmail,
        contractAddress,
        subscriptionName
    });
};

const sendSubscriptionStartedMail = async ({
    supplierEmail,
    subscriberEmail,
    subscriptionName,
    contractAddress,
}) => {
    return axios.post(`${urls.email}/${mailTypes.subscriptionStarted}`, {
        supplierEmail,
        subscriberEmail,
        contractAddress,
        subscriptionName
    });
};

const sendRequestSubscriptionMails = async ({
    supplierEmail,
    subscriberEmail,
    subscriptionName,
    transactionHash,
    etherScanUrl
}) => {
    return axios.post(`${urls.email}/${mailTypes.requestSubscription}`, {
        supplierEmail,
        subscriberEmail,
        subscriptionName,
        transactionHash,
        etherScanUrl
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
    sendRequestSubscriptionMails,
    sendSubscriptionStartedMail,
    sendTrialStartedMail,
    sendSubscriptionCancelledMails,
    sendRestorePasswordMail
};