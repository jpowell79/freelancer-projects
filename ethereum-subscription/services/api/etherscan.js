const axios = require('axios');

const API_ADDRESS = 'https://api.etherscan.io/api';
const ETHER_SCAN_API_TOKEN = "XGZCYQPPEWAPP339S38RS6IWCRJWZJPWR6";

const getWalletAddressTransactions = ({
    walletAddress,
    sort = 'asc',
    startblock = 0,
    endblock = 99999999,
    offset = 10,
    page = 1
}) => {
    return axios.get(
        `${API_ADDRESS}?module=account&action=txlist&address=${walletAddress}` +
        `&${startblock}=0&endblock=${endblock}&page=${page}&offset=${offset}&sort=${sort}` +
        `&apikey=${ETHER_SCAN_API_TOKEN}`
    ).then(res => res.data);
};

const getTransactionUrl = (baseUrl, address) => {
    return `${baseUrl}/tx/${address}`;
};

module.exports = {
    getWalletAddressTransactions,
    getTransactionUrl
};