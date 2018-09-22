const Request = require("./Request");
const mysqlDump = require("mysqldump");
const serverSettings = require("../serverSettings");

class DownloadRequest extends Request {
    async handleGet(){
        if(!this.isLoggedInAdmin())
            return this.responseHandler.sendUnauthorized();

        if(!this.req.params.dump)
            return this.responseHandler.sendBadRequest("Invalid download type.");

        return this.downloadAndCreateDatabaseDump();
    };

    async downloadAndCreateDatabaseDump(){
        try {
            const host = this.req.headers.host.startsWith("localhost")
                ? "localhost" : this.req.headers.host;
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

            const rootPath = require("path").normalize(__dirname + "/../../../..");
            const dumpFile = `${rootPath}/${serverSettings.DATABASE_DUMP_FILE}`;
            this.responseHandler.res.download(dumpFile, serverSettings.DATABASE_DUMP_FILE);
        } catch(err){
            this.responseHandler.sendSomethingWentWrong(err);
        }
    };
}

module.exports = DownloadRequest;