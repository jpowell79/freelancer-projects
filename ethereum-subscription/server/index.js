require("./config/defineGlobals");
const next = require("next");
const configApp = require("./config/configApp");
const network = require("./config/network");
const configSequelize = require("./config/configSequelize");
const serverSettings = require("./serverSettings");
const log = require("./services/log");

if(isProduction()){
    process.env.NODE_ENV = "production";
}

const nextApp = next({
    dir: serverSettings.NEXT_DIR,
    dev: isDevelopment()
});

nextApp.prepare()
    .then(() => configSequelize(serverSettings))
    .then(sequelize => configApp(nextApp, sequelize))
    .then(app => {
        const PORT = serverSettings.DEFAULT_PORT;
        const PROXY = isDevelopment() ? network.getProxy() : null;

        log.sectionTitle(`Starting Application`);

        app.listen(PORT, serverSettings.HOST, () => {
            console.log("You can now view the client in the browser.");
            console.log(`${"Local:".padEnd(17)} http://${serverSettings.HOST}:${PORT}/`);

            if(PROXY !== null){
                app.listen(PORT, PROXY, () => {
                    console.log(`${"On Your Network:".padEnd(17)} http://${PROXY}:${PORT}/\n`);
                    log.apiPoints();
                    log.endOfSection();
                });
            } else {
                console.log("\n");
                log.apiPoints();
                log.endOfSection();
            }
        });
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });