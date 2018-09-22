module.exports.admin = {
    username: "admin",
    password: "admin",
    role: "admin",
    email: "foo@0xB736a9bACC8855531AeF429735D477D4b5A4208.com",
    walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
};

module.exports.user = {
    username: "Foobar",
    password: "foobar",
    role: "supplier",
    email: "foo@0xB736a9bACC8855531AeF429735D477D4b5A4D208.com",
    walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
};

module.exports.subscriber = {
    walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
};

module.exports.subscription = {
    contractAddress: "0x3cbc16e2c379a1584ec821ac5720511ddbf355e0",
    subscriberAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208",
    transactionHash: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
};

module.exports.subscriptionType = {
    name: "FooType"
};

module.exports.subscriptionContract = {
    address: "0x3cbc16e2c379a1584ec821ac5720511ddbf355e0",
    ownerUsername: "Foobar",
    typeName: "FooType",
    details: "Random details"
};

module.exports.setting = {
    name: "FooColor",
    value: "#FF0000"
};