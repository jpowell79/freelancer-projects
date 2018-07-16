const next = require('next');
const siteSettings = require('../site-settings');
const DatabaseSettings = require('./config/DatabaseSettings');
const Settings = require('./config/Settings');
const configMongoose = require('./config/configMongoose');
const configServer = require('./config/configServer');
const log = require('./services/utils/log');

const app = next({
    dev: process.argv[2] !== 'production'
});

let server;
let mongoose;

app.prepare().then(() => {
    mongoose = configMongoose();
    const MONGODB_URI = process.env.MONGODB_URI || siteSettings.MONGODB_URI;

    return mongoose.connect(MONGODB_URI);
}).then(() => {
    const db = mongoose.connection;
    server = configServer(app, db);

    return DatabaseSettings.load();
}, () => {
    server = configServer(app);
}).then(() => {
    const PORT = process.env.PORT || siteSettings.DEFAULT_PORT;
    const PROXY = (siteSettings.PROXY) ? siteSettings.PROXY : Settings.getProxy();
    const databaseInfo = (global.db === null) ? "without database" : "with database";

    log.sectionTitle(`Starting Application ${databaseInfo}`);

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
}).catch(err => {
    console.error(err);
    process.exit(1);
});