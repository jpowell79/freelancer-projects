/*------------------------------------------------------------
 * Server Options
 *------------------------------------------------------------*/
module.exports.DEFAULT_PORT = 3000;
module.exports.NEXT_DIR = './client';
module.exports.HOST = 'localhost';

/*------------------------------------------------------------
 * Cookie Options
 *------------------------------------------------------------*/
module.exports.COOKIE_SECRET = 'T]s9,l4U!`gYg"Ngf+z-n>T)|,,rqE!u-$60d4gS<4i7O,=YtVOTCbz%{-mUSE';
module.exports.COOKIE_EXPIRE = 1000 * 60 * 60 * 12;
module.exports.COOKIE_NAME = 'session';


/*------------------------------------------------------------
 * Upload Options
 *------------------------------------------------------------*/
module.exports.MAX_UPLOAD_SIZE = '50mb';

/*------------------------------------------------------------
 * MySQL options
 *------------------------------------------------------------*/
module.exports.DATABASE_NAME = 'ethereum_subscription';
module.exports.DATABASE_USER = 'root';
module.exports.DATABASE_PASSWORD = null;
module.exports.DATABASE_PORT = 3306;
module.exports.DATABASE_DIALECT = 'mysql';


/*------------------------------------------------------------
 * ReCAPTCHA
 *------------------------------------------------------------*/
module.exports.RECAPTCHA_SECRET_KEY = '6LcVbGIUAAAAAJebHtHYG4kFtHLaN-jeGgr6jZC8';


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