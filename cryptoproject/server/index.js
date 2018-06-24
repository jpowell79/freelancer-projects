const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const glob = require('glob');
const next = require('next');
const urls = require('./services/utils/urls');
const siteSettings = require('../site-settings');
const Settings = require('./services/Settings');
const log = require('./services/utils/log');
const moment = require('moment');

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const MONGODB_URI = process.env.MONGODB_URI || siteSettings.MONGODB_URI;
const PORT = process.env.PORT || siteSettings.DEFAULT_PORT;

app.prepare().then(() => {
    server.set('json spaces', 4);
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    mongoose.Promise = Promise;
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    server.use((req, res, next) => {
        req.db = db;
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    const rootPath = require('path').normalize(__dirname + '/..');
    glob.sync(rootPath + '/server/routes/*.js').forEach(
        controllerPath => require(controllerPath)(server)
    );

    const customRequestHandler = (page, req, res) => {
        const mergedQuery = Object.assign({}, req.query, req.params);
        app.render(req, res, page, mergedQuery);
    };

    server.get(urls.base, customRequestHandler.bind(undefined, urls.base));
    server.get('*', app.getRequestHandler());

    moment.locale('en');
    return Settings.load();
}).then(() => {
    server.listen(PORT, () => {
        log.sectionTitle('Starting Application');
        console.log(`The application is running on http://localhost:${PORT}/\n`);
        log.apiPoints();
        log.endOfSection();
    });
});