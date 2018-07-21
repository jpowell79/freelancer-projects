const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const urls = require('../services/utils/urls');
const validate = require('form-validate');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

module.exports = (app, db = null) => {
    global.db = db;
    const server = express();
    const csrfProtection = csrf({cookie: true});

    server.set('json spaces', 4);
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(validate(server, {}));
    server.use(helmet());
    server.use(cookieParser());
    server.enable('trust proxy');

    server.use((req, res, next) => {
        req.db = db;
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    const rootPath = require('path').normalize(__dirname + '/../..');
    glob.sync(rootPath + '/server/routes/*.js').forEach(
        controllerPath => require(controllerPath)(server)
    );

    const customRequestHandler = (page, req, res) => {
        const mergedQuery = Object.assign({}, req.query, req.params);
        app.render(req, res, page, mergedQuery);
    };

    server.get('/form', csrfProtection, (req, res) => {
        res.render('send', {csrfToken: req.csrfToken()})
    });
    server.get(urls.base, customRequestHandler.bind(undefined, urls.base));
    server.get('*', app.getRequestHandler());

    return server;
};