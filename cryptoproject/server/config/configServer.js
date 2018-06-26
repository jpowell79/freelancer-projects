const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const urls = require('../services/utils/urls');

module.exports = (db, app) => {
    const server = express();

    server.set('json spaces', 4);
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

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

    server.get(urls.base, customRequestHandler.bind(undefined, urls.base));
    server.get('*', app.getRequestHandler());

    return server;
};