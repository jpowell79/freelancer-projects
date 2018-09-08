const roles = require('../../../services/constants/roles');

module.exports.settings = {
    etherScanUrl: 'https://kovan.etherscan.io',
    httpProvider: 'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv',
    homepageBanner: 'header.jpg',
    homepageBannerOverlayColor: '#33363f',
    homepageBannerTextColor: "#FFFFFF",
    homepageSlideshowAnimation: 'scale',
    homepageTableMaxRows: '100',
    logo: 'logo.png',
    siteTitle: 'Ethereum Subscriptions',
};

module.exports.subscriptionTypes = [
    {
        name: 'Gym Membership',
    },
    {
        name: 'IPTV Subscription',
    },
    {
        name: 'Magazine Subscription',
    },
    {
        name: 'Website Membership',
    }
];

module.exports.subscriptionContracts = [
    {
        address: '0x86842a129bd5fd249fb665c23d7ead88e7057153',
        ownerUsername: 'smnrkssn',
        typeName: 'Gym Membership',
        details: 'Random details',
        isActive: true
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
        contractAddress: '0x86842a129bd5fd249fb665c23d7ead88e7057153',
        transactionHash: '0x1e8b0942c7dd64e1ad4c6bb598ad5b4de88989c7df21930c4f9edaab6d830d6b'
    }
];

module.exports.users = [
    {
        username: 'admin',
        email: 'admin@example.com',
        role: roles.admin,
        password: 'admin',
        walletAddress: '0xfB5136361ab5faB28E602EA868909828d2ce23ca'
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