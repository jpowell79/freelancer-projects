require("./config/defineGlobals");
const next = require("next");
const configApp = require("./config/configApp");
const configSequelize = require("./config/configSequelize");
const serverSettings = require("./serverSettings");
const log = require("./services/log");

const nextApp = next({
    dir: serverSettings.NEXT_DIR,
    dev: isDevelopment()
});

nextApp.prepare()
    .then(() => configSequelize(serverSettings, serverSettings.LOAD_DEFAULT_DATABASE))
    .then(sequelize => configApp(nextApp, sequelize))
    .then(app => {
        log.sectionTitle(`Starting Application`);

        app.listen(serverSettings.DEFAULT_PORT, () => {
            console.log("You can now view the client in the browser.");
            log.apiPoints();
            log.endOfSection();
        });
    }).catch(err => {
        console.error(err);
        process.exit(1);
    });