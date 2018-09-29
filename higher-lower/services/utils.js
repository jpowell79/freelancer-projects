module.exports.isClient = () => {
    return typeof window !== "undefined";
};

module.exports.isServer = () => {
    return typeof window === "undefined";
};