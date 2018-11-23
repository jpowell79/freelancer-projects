const settings = require("../serverSettings");

global.isProduction = () => (
    process.argv[2] === "production"
);
global.isDevelopment = () => (
    process.argv[2] !== "production"
);
global.createdDatabase = false;
global.PROJECT_ROOT = require("path").normalize(__dirname + "/../..");
global.HOST = (isDevelopment()) ? settings.DEV_HOST : settings.PRODUCTION_HOST;
global.PROTOCOL = (isDevelopment()) ? settings.DEV_PROTOCOL : settings.PRODUCTION_PROTOCOL;

String.prototype.padEnd = function padEnd(targetLength,padString) {
    targetLength = targetLength>>0;
    padString = String((typeof padString !== "undefined" ? padString : " "));
    if (this.length > targetLength) {
        return String(this);
    }
    else {
        targetLength = targetLength-this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength/padString.length);
        }
        return String(this) + padString.slice(0,targetLength);
    }
};