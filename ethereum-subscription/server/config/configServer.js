const express = require('express');
const glob = require('glob');
const bodyParser = require('body-parser');
const urls = require('../../services/urls');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

module.exports = (app, sequelize) => {
    const server = express();
    const csrfProtection = csrf({cookie: true});

    server.set('json spaces', 4);
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(bodyParser.json());
    server.use(helmet());
    server.use(cookieParser());

    const rootPath = require('path').normalize(__dirname + '/../..');
    glob.sync(rootPath + '/server/routes/*.js').forEach(
        controllerPath => require(controllerPath)(server, sequelize)
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
