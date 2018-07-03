export const filterObject = (objectToFilter, objectToFilterOut) => {
    let filteredObject = {};

    Object.keys(objectToFilter).filter(key => {
        return !Object.keys(objectToFilterOut).includes(key);
    }).forEach(key => {
        filteredObject = Object.assign(
            JSON.parse(`{"${key}": "${objectToFilter[key]}"}`),
            filteredObject
        );
    });

    return filteredObject;
};

export const round = (value, decimals) => {
    return parseFloat(value.toFixed(decimals));
};

export const objectCompare = (object1, object2) => {
    return JSON.stringify(object1) === JSON.stringify(object2);
};

export const joinClassNames = (className1, className2 = '') => {
    return (className2 === '') ? className1 : [className1, className2].join(' ');
};

export const clone = (object) => {
    return JSON.parse(JSON.stringify(object));
};

export const flatten = (array) => {
    return [].concat.apply([], array);
};

export const reduce = (array, amountToReduce) => {
    return array.filter((item, i) => i < amountToReduce);
};

export const defaultComparator = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b){
        return -1;
    } else {
        return 0;
    }
};