const API = '/api';
const ARCHIVE = `${API}/archive`;
const HISTORIC_DATA = `${API}/historic-data`;
const ARCHIVED_HISTORIC_DATA = ARCHIVE + "/historic-data";
const EMAIL = `${API}/email`;

module.exports = {
    base: API,
    historicData: HISTORIC_DATA,
    archivedHistoricData: ARCHIVED_HISTORIC_DATA,
    email: EMAIL
};