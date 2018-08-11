const {urls, httpCodes} = require('../../services/constants/');
const {isLoggedInAdmin} = require('../../services/session');
const mysqlDump = require('mysqldump');
const serverSettings = require('../serverSettings');
const {
    SUCCESS,
    UNAUTHORIZED,
    BAD_REQUEST,
    METHOD_NOT_ALLOWED,
    SOMETHING_WENT_WRONG
} = httpCodes;

const handleGet = async (req, res) => {
    const loggedInAdmin = await isLoggedInAdmin(req);

    if(!loggedInAdmin){
        res.sendStatus(UNAUTHORIZED);
        return;
    }

    if(!req.params.dump){
        res.sendStatus(BAD_REQUEST);
        return;
    }

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
        res.download(dumpFile, serverSettings.DATABASE_DUMP_FILE);
    } catch(err){
        if(global.isDevelopment()) console.error(err);
        res.sendStatus(SOMETHING_WENT_WRONG)
    }
};

module.exports = (server) => {
    server.use(`${urls.download}/:dump?`, server.initSession, (req, res) => {
        switch (req.method){
        case "GET":
            handleGet(req, res);
            break;
        default:
            res.sendStatus(METHOD_NOT_ALLOWED);
            break;
        }
    });
};