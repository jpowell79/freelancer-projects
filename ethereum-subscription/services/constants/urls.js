const API = '/api';
const USERS = `${API}/users`;
const SETTINGS = `${API}/settings`;
const SESSIONS = `${API}/sessions`;
const UPLOAD = `${API}/upload`;
const EMAIL = `${API}/email`;

module.exports = {
    base: API,
    users: USERS,
    settings: SETTINGS,
    sessions: SESSIONS,
    upload: UPLOAD,
    email: EMAIL
};