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

export const getTimePassed = (date) => {
    let hours = date.getHours() * 60 * 60 * 1000;
    let minutes = date.getMinutes() * 60 * 1000;
    let seconds = date.getSeconds() * 1000;
    let milliseconds = date.getMilliseconds();

    return hours+minutes+seconds+milliseconds;
};

export const getTimeLeftInTheDay = (date) => {
    let hours = Math.abs(date.getHours() * 60 * 60 * 1000 - 1000 * 23 * 60 * 60);
    let minutes = Math.abs(date.getMinutes() * 60 * 1000 - 1000 * 59 * 60);
    let seconds = Math.abs(date.getSeconds() * 1000 - 1000 * 60);
    let milliseconds = Math.abs(date.getMilliseconds() - 1000);

    return hours+minutes+seconds+milliseconds;
};

export const joinClassNames = (className1, className2) => {
    return [className1, className2].join(' ');
};

export const calcTotalPercentChange = (startPrice, currentPrice) => {
    if(startPrice === 0){
        return "Unavailable";
    }

    let change = currentPrice-startPrice;
    return ((change/startPrice)*100).toFixed(2);
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