module.exports.isObject = (object) => {
    return (object instanceof Object && !(object instanceof Array));
};

module.exports.isEmpty = (object) => {
    if(!object) return true;

    return Object.keys(object).length === 0;
};

module.exports.values = (object) => {
    return Object.keys(object).map(key => object[key]);
};

module.exports.filter = (object, predicate) => {
    const filteredObject = {};

    Object.keys(object).forEach(key => {
        const value = object[key];
        if(predicate(value, key)){
            filteredObject[key] = value;
        }
    });

    return filteredObject;
};

module.exports.length = (object) => {
    return Object.keys(object).length;
};

module.exports.map = (object, transform) => {
    const mappedObject = {};

    Object.keys(object).forEach(key => {
        const value = object[key];
        mappedObject[key] = transform(value, key);
    });

    return mappedObject;
};