module.exports.looksLikeEmail = (string) => {
    return /\S+@\S+\.\S+/.test(string);
};

