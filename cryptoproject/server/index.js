const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const glob = require('glob');
const next = require('next');
const urls = require('./services/utils/urls');
const SnapshotDaemon = require('./services/SnapshotService/');
const SNAPSHOT_REFRESH_CONTRACT = require('../site-settings').SNAPSHOT_CONTRACT_REFRESH_RATE;

const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/database`;
const PORT = process.env.PORT || 3000;

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

    let snapshotDaemon = new SnapshotDaemon({
        onLaunch: (waitLog, watcher) => {
            if(watcher.timesToWatch.length > 0){
                console.log('The snapshot service is now waiting for the following contracts:\n');
                console.log(waitLog);
            } else {
                console.log('The snapshot service found no times to wait for. See the following data for reference:\n');
                console.log(waitLog);
            }
        },
        onSnapshotSaved: (contract) => {
            console.log(`Historic data for contract ${contract.contract_address} saved.`);
        }
    });

    setInterval(() => {
        console.log('Relaunching the snapshot service...');
        snapshotDaemon.reLaunch();
    }, SNAPSHOT_REFRESH_CONTRACT);

    server.listen(PORT, () => {
        let routesLog = '';

        Object.keys(urls).forEach((addressKey, i) => {
            if(urls[addressKey] !== urls.base){
                routesLog += `${i}: ${urls[addressKey]}/\n`;
            }
        });

        console.log(
            `App running on http://localhost:${PORT}/\n\n` +
            `Available API points:\n` +
            `${routesLog}`
        );
    });
});