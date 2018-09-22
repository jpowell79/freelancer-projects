module.exports = {
    confirmationMail: "confirmationMail",
    contractCreated: "contractCreated",
    massMailSuppliers: "massMailSuppliers",
    requestContract: "requestContract",
    requestSubscription: "requestSubscription",
    includes: (string) => {
        return Object.keys(module.exports)
            .filter(key => key !== "includes")
            .includes(string);
    }
};