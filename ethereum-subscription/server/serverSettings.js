/*----------------------------------------
 * Server Options
 *----------------------------------------*/
module.exports.DEFAULT_PORT = 3000;
module.exports.NEXT_DIR = './client';
module.exports.HOST = 'localhost';

/*----------------------------------------
 * Session Options
 *----------------------------------------*/
module.exports.COOKIE_SECRET = 'T]s9,l4U!`gYg"Ngf+z-n>T)|,,rqE!u-$60d4gS<4i7O,=YtVOTCbz%{-mUSE';
module.exports.COOKIE_EXPIRE = 1000 * 60 * 30;
module.exports.COOKIE_NAME = 'session';

/*----------------------------------------
 * MySQL options
 *----------------------------------------*/
module.exports.DATABASE_NAME = 'ethereum_subscription';
module.exports.DATABASE_USER = 'root';
module.exports.DATABASE_PASSWORD = null;
module.exports.DATABASE_PORT = 3306;
module.exports.DATABASE_DIALECT = 'mysql';

/*----------------------------------------
 * ReCAPTCHA
 *----------------------------------------*/
module.exports.RECAPTCHA_SECRET_KEY = '6LcVbGIUAAAAAJebHtHYG4kFtHLaN-jeGgr6jZC8';