const roles = require("../../../services/constants/roles");

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
        details: "Random details",
        isActive: true
    }
];

module.exports.subscribers = [
    {
        walletAddress: "0xB736a9bACC8855531AeF429735D477D4b5A4D208"
    },
    {
        walletAddress: "0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F"
    }
];

module.exports.subscriptions = [];

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