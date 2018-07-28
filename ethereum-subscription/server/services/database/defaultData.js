const roles = require('../../../services/roles');

module.exports.settings = {
    etherScanUrl: 'https://kovan.etherscan.io',
    httpProvider: 'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'
};

module.exports.users = [
    {
        username: 'root',
        email: 'root@example.com',
        role: roles.admin,
        password: 'root',
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208',
        isActivated: true
    },
    {
        username: 'admin',
        email: 'admin@example.com',
        role: roles.admin,
        password: 'admin',
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208',
        isActivated: true
    },
    {
        username: 'supplier',
        email: 'supplier@example.com',
        role: roles.supplier,
        password: roles.supplier,
        walletAddress: '0xB736a9bACC8855531AeF429735D477D4b5A4D208',
        isActivated: true
    }
];