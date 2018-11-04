const serverSettings = require("../serverSettings");
const mysqldump = require("mysqldump");

module.exports = async () => {
    return mysqldump({
        connection: {
            host: serverSettings.DATABASE_DUMP_HOST,
            port: serverSettings.DATABASE_PORT,
            user: serverSettings.DATABASE_USER,
            password: serverSettings.DATABASE_PASSWORD,
            database: serverSettings.DATABASE_NAME
        },
        dumpToFile: `${PROJECT_ROOT}/${serverSettings.DATABASE_DUMP_FILE}`
    });
};