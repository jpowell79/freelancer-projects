module.exports.isDefined = (stringsOrString) => {
    const stringIsDefined = (string) => (
        string !== null && string !== undefined && string !== ''
    );

    if(Array.isArray(stringsOrString)){
        return stringsOrString
            .filter(string => stringIsDefined(string))
            .length === stringsOrString.length;
    } else {
        return stringIsDefined(stringsOrString);
    }
};

module.exports.hasLowerCase = (string) => (
    string.toUpperCase() !== string
);

module.exports.hasUpperCase = (string) => (
    string.toLowerCase() !== string
);

module.exports.hasSpecialCharacters = (string) => (
    /[^a-zA-Z0-9]+/g.test(string)
);