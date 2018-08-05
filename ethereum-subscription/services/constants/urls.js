const API = '/api';
const USERS = `${API}/users`;
const SETTINGS = `${API}/settings`;
const SESSIONS = `${API}/sessions`;
const UPLOAD = `${API}/upload`;
const EMAIL = `${API}/email`;
const SUBSCRIPTIONS = `${API}/subscriptions`;
const SUBSCRIPTION_TYPES = `${SUBSCRIPTIONS}/types`;
const SUBSCRIPTION_CONTRACTS = `${SUBSCRIPTIONS}/contracts`;
const SUBSCRIPTION_SUBSCRIBERS = `${SUBSCRIPTIONS}/subscribers`;

module.exports = {
    base: API,
    users: USERS,
    settings: SETTINGS,
    sessions: SESSIONS,
    upload: UPLOAD,
    email: EMAIL,
    subscriptions: SUBSCRIPTIONS,
    subscriptionTypes: SUBSCRIPTION_TYPES,
    subscriptionContracts: SUBSCRIPTION_CONTRACTS,
    subscriptionSubscribers: SUBSCRIPTION_SUBSCRIBERS
};