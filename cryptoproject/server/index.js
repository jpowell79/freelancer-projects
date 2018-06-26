const next = require('next');
const siteSettings = require('../site-settings');
const Settings = require('./config/Settings');
const configMongo = require('./config/configMongo');
const configServer = require('./config/configServer');
const log = require('./services/utils/log');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

let server;

app.prepare().then(() => {
    let db = configMongo();
    server = configServer(db, app);

    return Settings.load();
}).then(() => {
    const PORT = process.env.PORT || siteSettings.DEFAULT_PORT;

    server.listen(PORT, () => {
        log.sectionTitle('Starting Application');
        console.log(`The application is running on http://localhost:${PORT}/\n`);
        log.apiPoints();
        log.endOfSection();
    });
});