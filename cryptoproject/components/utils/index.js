import Router from 'next/router';

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

export const redirect = (res, url) => {
    if(res){
        res.writeHead(302, {
            Location: url
        });
        res.end();
        res.finished = true;
    } else {
        Router.push(url);
    }
};