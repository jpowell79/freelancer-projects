const next = require('next');
const siteSettings = require('../site-settings');
const Settings = require('./config/Settings');
const configMongo = require('./config/configMongo');
const configServer = require('./config/configServer');
const log = require('./services/utils/log');

const app = next({
    dev: process.argv[2] !== 'production'
});

let server;

app.prepare().then(() => {
    let db = configMongo();
    server = configServer(db, app);

    return Settings.load();
}).then(() => {
    const PORT = process.env.PORT || siteSettings.DEFAULT_PORT;
    const PROXY = (siteSettings.PROXY) ? siteSettings.PROXY : Settings.getProxy();

    log.sectionTitle('Starting Application');

    server.listen(PORT, siteSettings.HOST, () => {
        console.log('You can now view the client in the browser.');
        console.log(`${'Local:'.padEnd(17)} http://${siteSettings.HOST}:${PORT}/`);

        if(PROXY !== null){
            server.listen(PORT, PROXY, () => {
                console.log(`${'On Your Network:'.padEnd(17)} http://${PROXY}:${PORT}/\n`);
                log.apiPoints();
                log.endOfSection();
            });
        } else {
            console.log('\n');
            log.apiPoints();
            log.endOfSection();
        }
    });
});