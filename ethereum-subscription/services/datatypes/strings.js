const {random} = require("../utils");
const {regex} = require("../constants");

module.exports.isString = (string) => (
    typeof string === 'string'
);

module.exports.isDefined = (stringsOrString) => {
    const stringIsDefined = (string) => (
        string !== null && string !== undefined && string !== ""
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

module.exports.isUpperCase = (string) => {
    return string.toUpperCase() === string;
};

module.exports.spaceCamelCase = (string) => {
    if(!module.exports.isDefined(string)) return string;

    let spacedCamelCase = string.charAt(0).toUpperCase();


    for(let i = 1; i < string.length; i++){
        const char = string.charAt(i);
        spacedCamelCase += (module.exports.isUpperCase(char)) ? ` ${char}` : char;
    }

    return spacedCamelCase;
};

/**
 * @param string like Gym Membership.
 * @returns {string} gymMembership
 */
module.exports.toCamelCase = (string) => {
    if(string.length === 0) return "";

    const withoutSpaces = string.split(" ").join("");
    const decapitalizeFirstLetter = withoutSpaces.charAt(0).toLowerCase();

    if(withoutSpaces.length === 1) return decapitalizeFirstLetter;

    return `${decapitalizeFirstLetter}${withoutSpaces.substring(1)}`;
};

module.exports.generateRandom = (
    stringLength,
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) => {
    let string = "";

    for (let i = 0; i < stringLength; i++) {
        const charIndex = random(0, chars.length);
        string += chars.charAt(charIndex);
    }

    return string;
};

module.exports.toDateString = (date) => {
    let year = date.getFullYear().toString(10);
    let month = (date.getMonth()+1).toString(10);
    let day = date.getDate().toString(10);

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return `${year}/${month}/${day}`;
};