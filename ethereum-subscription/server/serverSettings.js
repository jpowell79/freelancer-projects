/*------------------------------------------------------------
 * Server Options
 *------------------------------------------------------------*/
module.exports.DEFAULT_PORT = 3000;
module.exports.NEXT_DIR = "./client";
module.exports.PROTOCOL = "http";
module.exports.HOST = "localhost";

/*------------------------------------------------------------
 * Cookie Options
 *------------------------------------------------------------*/
module.exports.COOKIE_SECRET = "T]s9,l4U!`gYg'Ngf+z-n>T)|,,rqE!u-$60d4gS<4i7O,=YtVOTCbz%{-mUSE";
module.exports.COOKIE_EXPIRE = 1000 * 60 * 60 * 12;
module.exports.COOKIE_NAME = "session";


/*------------------------------------------------------------
 * Upload Options
 *------------------------------------------------------------*/
module.exports.MAX_UPLOAD_SIZE = "50mb";


/*------------------------------------------------------------
 * Refund Daemon
 *------------------------------------------------------------
 * Runs in the background with a specified interval and
 * checks for any subscription which has been inactive for more
 * than a certain amount of hours. For each subscription it
 * will send an email about a refund being available to the
 * subscriber and supplier if it haven't done so already.
 *------------------------------------------------------------*/
module.exports.REFUND_DAEMON_SETTINGS = {
    enabled: true,
    interval: {
        minutes: 15
    },
    refundSubscriptionsOlderThan: {
        hours: 24
    }
};


/*------------------------------------------------------------
 * MySQL options
 *------------------------------------------------------------*/
module.exports.LOAD_DEFAULT_DATABASE = false;
module.exports.DATABASE_NAME = "ethereum_subscription";
module.exports.DATABASE_USER = "root";
module.exports.DATABASE_PASSWORD = "";
module.exports.DATABASE_PORT = 3306;
module.exports.DATABASE_DIALECT = "mysql";
module.exports.DATABASE_DUMP_HOST = "localhost";
module.exports.DATABASE_DUMP_FILE = "dump.sql";


/*------------------------------------------------------------
 * ReCAPTCHA
 *------------------------------------------------------------*/
module.exports.RECAPTCHA_SECRET_KEY = "6LcVbGIUAAAAAJebHtHYG4kFtHLaN-jeGgr6jZC8";


/*------------------------------------------------------------
 * Email
 *------------------------------------------------------------*/
module.exports.NODEMAILER_TRANSPORT = {
    service: "Gmail",
    auth: {
        user: "sampletonexample",
        pass: "Sampleton_Example"
    },
    tls: {
        rejectUnauthorized: false
    }
};