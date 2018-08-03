const isNumber = (string) => {
    return /^\d+$/.test(string);
};

const parseNumberStringsToNumbers = (responses) => {
    return responses.map(response => {
        const key = Object.keys(response)[0];
        const value = response[key];

        if(typeof value !== 'string') return response;

        return (
            isNumber(value)
                ? {[key]: parseFloat(value)}
                : response
        );
    });
};

const parseContractArrayToObject = (responses) => {
    if(responses.length > 0){
        return responses.reduce((accumulator, currentValue) =>
            Object.assign({}, accumulator, currentValue)
        );
    }

    return {};
};

const toMilliseconds = (contractTime) => {
    return parseFloat(contractTime)*1000;
};

module.exports = {
    toMilliseconds,
    parseNumberStringsToNumbers,
    parseContractArrayToObject
};