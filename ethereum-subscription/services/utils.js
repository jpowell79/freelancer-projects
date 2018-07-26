module.exports.isClient = () => {
    return typeof window !== 'undefined';
};

module.exports.isServer = () => {
    return typeof window === 'undefined';
};

module.exports.random = (lowest, highest) => {
    return Math.floor((Math.random() * highest) + lowest);
};