module.exports = {
    name: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/g,
    username: /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g,
    specialCharacters: /[^a-zA-Z0-9]+/g,
    walletAddress: /0x[a-zA-Z0-9]+/g
};