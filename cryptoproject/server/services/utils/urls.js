const API = '/api';
const ARCHIVE = `${API}/archive`;
const HISTORIC_DATA = `${API}/historic-data`;
const ARCHIVED_HISTORIC_DATA = ARCHIVE + "/historic-data";
const CRYPTO_DATA = `${API}/crypto-data`;
const EMAIL = `${API}/email`;

module.exports = {
    base: API,
    historicData: HISTORIC_DATA,
    archivedHistoricData: ARCHIVED_HISTORIC_DATA,
    email: EMAIL,
    cryptoData: CRYPTO_DATA
};