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
    walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208",
    email: "foo@example.com"
};

module.exports.subscription = {
    contractAddress: "0x807bf1433e7c3d9ee6b72a3b5dbe2cd05d3764e9",
    subscriberAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208",
    transactionHash: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
};

module.exports.subscriptionType = {
    name: "FooType"
};

module.exports.subscriptionContract = {
    address: "0x807bf1433e7c3d9ee6b72a3b5dbe2cd05d3764e9",
    ownerUsername: "Foobar",
    typeName: "FooType",
    details: "Random details"
};

module.exports.settings = {
    FooColor: "#FF0000",
    httpProvider: "https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv",
};

module.exports.setting = {
    name: "FooColor",
    value: "#FF0000"
};