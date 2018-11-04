const passwordHash = require("password-hash");

module.exports = async () => console.log(passwordHash.generate(process.argv[3]));