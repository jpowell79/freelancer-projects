const isClient = () => {
    return typeof window !== 'undefined';
};

const isServer = () => {
    return typeof window === 'undefined';
};

module.exports = {
    isClient,
    isServer
};