module.exports.isEmpty = (object) => {
    return Object.keys(object).length === 0;
};

module.exports.values = (object) => {
    return Object.keys(object).map(key => object[key]);
};