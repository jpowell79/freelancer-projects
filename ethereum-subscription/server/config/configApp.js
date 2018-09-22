const express = require("express");
const glob = require("glob");
const bodyParser = require("body-parser");
const urls = require("../../services/constants/urls");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const serverSettings = require("../serverSettings");

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
    const rootPath = require("path").normalize(__dirname + "/../..");
    glob.sync(rootPath + "/server/routes/*.js").forEach(
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

module.exports = (nextApp, sequelize) => {
    const app = express();

    addPlugins(app);
    addMiddleware(app);
    addRoutes(app, nextApp, sequelize);

    return app;
};
