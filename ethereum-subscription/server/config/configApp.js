const express = require("express");
const glob = require("glob");
const bodyParser = require("body-parser");
const urls = require("../../services/constants/urls");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const serverSettings = require("../serverSettings");
const RefundDaemon = require("../services/RefundDaemon");
const Web3 = require("../../services/smart-contracts/Web3");
const log = require("../services/log");

const addPlugins = (app) => {
    app.set("json spaces", 4);
    app.use(bodyParser.urlencoded({limit: serverSettings.MAX_UPLOAD_SIZE, extended: true}));
    app.use(bodyParser.json({limit: serverSettings.MAX_UPLOAD_SIZE, extended: true}));
    app.use(helmet());
    app.use(cookieParser(serverSettings.COOKIE_SECRET));
    app.use(session({
        name: serverSettings.COOKIE_NAME,
        secret: serverSettings.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: serverSettings.COOKIE_EXPIRE
        }
    }));
};

const addMiddleware = (app) => {
    app.initSession = (req, res, next) => {
        if(!req.session.user){
            req.session.user = {};
        } else {
            req.session.cookie.maxAge = serverSettings.COOKIE_EXPIRE;
        }

        if(!req.session.tempUser) {
            req.session.tempUser = {};
        }

        req.session.userWasActivated = false;

        next();
    };
};

const addRoutes = (app, nextApp, sequelize) => {
    const csrfProtection = csrf({cookie: true});
    glob.sync(`${PROJECT_ROOT}/server/routes/*.js`).forEach(
        controllerPath => require(controllerPath)(app, sequelize)
    );

    const customRequestHandler = (page, req, res) => {
        const mergedQuery = Object.assign({}, req.query, req.params);
        nextApp.render(req, res, page, mergedQuery);
    };

    if(global.isProduction()){
        app.get("/form", csrfProtection, (req, res) => {
            res.render("send", {csrfToken: req.csrfToken()})
        });
    }
    app.get(urls.base, customRequestHandler.bind(undefined, urls.base));
    app.get("*", nextApp.getRequestHandler());
};

const initializeWeb3 = async (sequelize) => {
    return sequelize.models.settings.findOne({
        where: {name: "httpProvider"}
    }).then(setting => setting.dataValues.value)
        .then(httpProvider => {
            global.web3 = new Web3(httpProvider);
        });
};

const addDaemons = (sequelize) => {
    if(serverSettings.REFUND_DAEMON_SETTINGS.enabled){
        log.sectionTitle("Starting RefundDaemon");
        new RefundDaemon(serverSettings.REFUND_DAEMON_SETTINGS, sequelize).start();
        console.log("RefundDaemon started successfully!");
        console.log(
            `It will run every ${serverSettings.REFUND_DAEMON_SETTINGS.interval.minutes} minutes`
        );
        log.endOfSection();
    }
};

module.exports = async (nextApp, sequelize) => {
    const app = express();

    addPlugins(app);
    addMiddleware(app);
    addRoutes(app, nextApp, sequelize);
    addDaemons(sequelize);
    await initializeWeb3(sequelize);

    return app;
};
