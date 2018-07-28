require('./services/padEnd');
const next = require('next');
const configServer = require('./config/configServer');
const network = require('./config/network');
const configSequelize = require('./config/configSequelize');
const addGlobalHelpers = require('./config/addGlobalHelpers');
const serverSettings = require('./serverSettings');
const log = require('./services/log');

addGlobalHelpers();

const app = next({
    dir: serverSettings.NEXT_DIR,
    dev: !global.isProduction()
});

app.prepare().then(() => {
    return configSequelize(serverSettings);
}).then(sequelize => {
    return configServer(app, sequelize);
}).then(server => {
    const PORT = serverSettings.DEFAULT_PORT;
    const PROXY = network.getProxy();

    log.sectionTitle(`Starting Application`);

    server.listen(PORT, serverSettings.HOST, () => {
        console.log('You can now view the client in the browser.');
        console.log(`${'Local:'.padEnd(17)} http://${serverSettings.HOST}:${PORT}/`);

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