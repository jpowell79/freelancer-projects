module.exports.isEmpty = (object) => {
    if(!object) return true;

    return Object.keys(object).length === 0;
};

module.exports.values = (object) => {
    return Object.keys(object).map(key => object[key]);
};