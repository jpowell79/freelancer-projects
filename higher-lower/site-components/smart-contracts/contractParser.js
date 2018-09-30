export const parseContractArrayToObject = (responses) => {
    if(responses.length > 0){
        return responses.reduce((accumulator, currentValue) =>
            Object.assign({}, accumulator, currentValue)
        );
    }

    return {};
};