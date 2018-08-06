const roles = require('./constants/roles');

module.exports.settings = {
    etherScanUrl: 'https://kovan.etherscan.io',
    httpProvider: 'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv',
    homepageBanner: 'header.jpg',
    homepageBannerOverlayColor: '#33363f',
    homepageBannerTextColor: "#FFFFFF",
    homepageBannerText: (
        `Take out a subscription to a service, and pay for the service ` +
        `using Ethereum, with a public record of the terms of the ` +
        `contract and an easy way to request a subscription cancellation ` +
        `if it ever becomes necessary.`
    ),
    homepageBannerTitle: 'Ethereum Subscriptions',
    logo: 'logo.png',
    siteTitle: 'Ethereum Subscriptions'
};

module.exports.subscriptionTypes = [
    {
        name: 'Gym Membership'
    }
];

module.exports.subscriptionContracts = [
    {
        address: '0x4d3566afa9e15b158fb1d89aa921c1c73a22c552',
        ownerUsername: 'smnrkssn',
        typeName: 'Gym Membership',
        details: 'Random details'
    },
    {
        address: '0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F',
        ownerUsername: 'supplier',
        typeName: 'Gym Membership',
        details: 'Some details'
    }
];

module.exports.subscribers = [
    {
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208'
    },
    {
        walletAddress: '0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F'
    }
];

module.exports.subscriptions = [
    {
        subscriberAddress: '0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F',
        contractAddress: '0x4d3566afa9e15b158fb1d89aa921c1c73a22c552'
    },
    {
        subscriberAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208',
        contractAddress: '0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F'
    }
];

module.exports.users = [
    {
        username: 'admin',
        email: 'admin@example.com',
        role: roles.admin,
        password: 'admin',
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208'
    },
    {
        username: 'supplier',
        email: 'sampletonexample@gmail.com',
        role: roles.supplier,
        password: roles.supplier,
        walletAddress: '0x18b3806bF06EDFDE1F57FD55B802f62259F90d8F'
    },
    {
        username: 'smnrkssn',
        email: 'smnrkssn@hotmail.se',
        role: roles.supplier,
        password: 'smnrkssn',
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208'
    }
];