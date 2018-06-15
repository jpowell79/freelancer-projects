import Web3 from 'web3';

let index;

if (typeof window !== 'undefined' && typeof window.index !== 'undefined') {
    // We are in the browser and metamask is running
    index = new Web3(window.index.currentProvider);
} else {
    // We are on the server or not running metamask
    // use demo Infura account
    const provider = new Web3.providers.HttpProvider(
        'https://kovan.infura.io/1Vql2txeV5cLgGiNaSXv'
    );

    index = new Web3(provider);
}

// const web3 = new Web3(window.web3.currentProvider);
export default index;

// TODO: improve later for when users don't have metamask installed