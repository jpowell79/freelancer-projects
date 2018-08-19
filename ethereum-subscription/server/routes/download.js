const {urls} = require('../../services/constants/');
const {isLoggedInAdmin} = require('../../services/session');
const mysqlDump = require('mysqldump');
const serverSettings = require('../serverSettings');
const ResponseHandler = require('../services/api/ResponseHandler');

function DownloadRequest({req, sequelize, responseHandler}){
    const downloadAndCreateDatabaseDump = async () => {
        try {
            const host = req.headers.host.startsWith('localhost') ? 'localhost' : req.headers.host;
            await mysqlDump({
                connection: {
                    host: host,
                    port: serverSettings.DATABASE_PORT,
                    user: serverSettings.DATABASE_USER,
                    password: serverSettings.DATABASE_PASSWORD,
                    database: serverSettings.DATABASE_NAME
                },
                dumpToFile: `./${serverSettings.DATABASE_DUMP_FILE}`
            });

            const rootPath = require('path').normalize(__dirname + '/../..');
            const dumpFile = `${rootPath}/${serverSettings.DATABASE_DUMP_FILE}`;
            responseHandler.res.download(dumpFile, serverSettings.DATABASE_DUMP_FILE);
        } catch(err){
            responseHandler.sendSomethingWentWrong(err);
        }
    };

    this.handleGet = async () => {
        const loggedInAdmin = await isLoggedInAdmin(req);

        if(!loggedInAdmin){
            return responseHandler.sendUnauthorized();
        }

        if(!req.params.dump){
            return responseHandler.sendBadRequest('Unexpected download type.');
        }

        return downloadAndCreateDatabaseDump();
    };
}

module.exports = (server) => {
    server.use(`${urls.download}/:dump?`, server.initSession, (req, res) => {
        const responseHandler = new ResponseHandler(res);
        const downloadRequest = new DownloadRequest({req, sequelize, responseHandler});

        switch (req.method){
        case "GET":
            return downloadRequest.handleGet();
        default:
            return responseHandler.sendMethodNotAllowed();
        }
    });
};