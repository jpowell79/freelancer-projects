const roles = require("../../../services/constants/roles");

const unusedContracts = [
    "0x807bf1433e7c3d9ee6b72a3b5dbe2cd05d3764e9",
    "0x3f35f7182821b75ccf76228ef2111c32bc537ef2"
];

module.exports.settings = {
    etherScanUrl: "https://kovan.etherscan.io",
    httpProvider: "https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv",
    homepageBanner: "header.jpg",
    homepageBannerOverlayColor: "#33363f",
    homepageBannerTextColor: "#FFFFFF",
    homepageSlideshowAnimation: "scale",
    homepageSlideshowAutoplaySpeed: 10000,
    homepageTableMaxRows: "100",
    logo: "logo.png",
    siteTitle: "Ethereum Subscriptions"
};

module.exports.subscriptionTypes = [
    {
        name: "Gym Membership",
    },
    {
        name: "IPTV Subscription",
    },
    {
        name: "Magazine Subscription",
    },
    {
        name: "Website Membership",
    }
];

module.exports.subscriptionContracts = [
    {
        address: "0xd090f94eb78dab1127b675fbd41cd50f5cb1a4fe",
        ownerUsername: "smnrkssn",
        typeName: "Gym Membership",
        details: "Sample details",
        isActive: true,
        hasFreeTrials: false
    },
    {
        address: "0xb7f3ffe84f962645ee48e9b58dde0f60c103c56e",
        ownerUsername: "smnrkssn",
        typeName: "IPTV Subscription",
        details: "",
        isActive: true,
        hasFreeTrials: true
    },
    {
        address: "0x3fdc1a9193f0dc7f9a83e03612c6412bd89e80fd",
        ownerUsername: "smnrkssn",
        typeName: "Magazine Subscription",
        details: "",
        isActive: true,
        hasFreeTrials: false
    },
    {
        address: "0x97a6edfa9a9ec705f86ee3e29b48dc1312b87987",
        ownerUsername: "smnrkssn",
        typeName: "Website Membership",
        details: "",
        isActive: false,
        hasFreeTrials: true
    },
    {
        address: "0x9bfc97a385befea8f3cf3080b20ed7653abf1f84",
        ownerUsername: "smnrkssn",
        typeName: "Website Membership",
        details: "",
        isActive: true,
        hasFreeTrials: false
    }
];

module.exports.subscribers = [
    {
        walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208",
        email: "smnrkssn@hotmail.se"
    },
    {
        walletAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F",
        email: "smnrkssn@hotmail.se"
    }
];

module.exports.subscriptions = [
    {
        subscriberAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F",
        contractAddress: "0xd090f94eb78dab1127b675fbd41cd50f5cb1a4fe",
        transactionHash: "0x1e8b0942c7dd64e1ad4c6bb598ad5b4de88989c7df21930c4f9edaab6d830d6b"
    },
    {
        subscriberAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F",
        contractAddress: "0xb7f3ffe84f962645ee48e9b58dde0f60c103c56e",
        transactionHash: "0x5e3c26a4c5eb191ee88d2c243487b499b9dec34011573bbe0aa5493b84e7ce04"
    },
    {
        subscriberAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F",
        contractAddress: "0x9bfc97a385befea8f3cf3080b20ed7653abf1f84",
        transactionHash: "0x2df84cbe5c33e46cdeaed088fcd294ca552112a1ea09bd07cab2a21a9781438e"
    }
];

module.exports.users = [
    {
        username: "admin",
        email: "admin@example.com",
        role: roles.admin,
        password: "admin",
        walletAddress: "0xfB5136361ab5faB28E602EA868909828d2ce23ca"
    },
    {
        username: "supplier",
        email: "sampletonexample@gmail.com",
        role: roles.supplier,
        password: roles.supplier,
        walletAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F"
    },
    {
        username: "smnrkssn",
        email: "smnrkssn@hotmail.se",
        role: roles.supplier,
        password: "smnrkssn",
        walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
    }
];