module.exports = {
    confirmationMail: "confirmationMail",
    contractCreated: "contractCreated",
    massMailSuppliers: "massMailSuppliers",
    requestContract: "requestContract",
    requestSubscription: "requestSubscription",
    subscriptionStarted: "subscriptionStarted",
    trialStarted: "trialStarted",
    subscriptionCancelled: "subscriptionCancelled",
    includes: (string) => {
        return Object.keys(module.exports)
            .filter(key => key !== "includes")
            .includes(string);
    }
};