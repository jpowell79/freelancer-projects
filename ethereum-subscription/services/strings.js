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