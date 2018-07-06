module.exports.looksLikeEmail = (string) => {
    return /\S+@\S+/.test(string);
};

