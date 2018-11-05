const strings = require("./datatypes/strings");
const {regex} = require("./constants");
const {isClient} = require("./utils");

module.exports.getFieldError = (fieldName, field) => {
    switch(fieldName){
    case "username":
    case "supplierUsername":
        return module.exports.getUsernameError(field);
    case "password":
        return module.exports.getPasswordError(field);
    case "contractPassword":
        return module.exports.getContractPasswordError(field);
    case "email":
        return module.exports.getEmailError(field, strings.spaceCamelCase(fieldName));
    case "grecaptcha":
        return module.exports.getGrecaptchaError();
    case "walletAddress":
    case "contractAddress":
    case "smartContractAddress":
    case "supplierWalletAddress":
        return module.exports.getEthereumAddressError(field, strings.spaceCamelCase(fieldName));
    case "subscriptionName":
        return module.exports.getNameError(field, strings.spaceCamelCase(fieldName));
    case "exitFee":
    case "joinFee":
    case "subscriptionPrice":
    case "subscriptionLengthInWeeks":
    case "amount":
    case "duration":
        return module.exports.getNumberError(field, strings.spaceCamelCase(fieldName));
    case "subscriptionType":
    case "contractType":
    case "subject":
    case "body":
        return module.exports.getTextError(field, strings.spaceCamelCase(fieldName));
    case "subscriptionTypeId":
        return module.exports.getNotDefinedError(field, strings.spaceCamelCase(fieldName));
    default:
        return "";
    }
};

module.exports.getContractPasswordError = (contractPassword, fieldName = "The password") => {
    if(!strings.isString(contractPassword) || !strings.isDefined(contractPassword)){
        return `${fieldName} is required.`
    } else if (contractPassword.length > 16){
        return `${fieldName} can at most be 16 characters long`;
    }

    return "";
};

module.exports.getNotDefinedError = (field, fieldName) => {
    if(!field){
        return `${fieldName} is required.`;
    }

    return "";
};

module.exports.getTextError = (text, fieldName) => {
    if(!strings.isString(text)) {
        return `${fieldName} must be a string`;
    } else if(!strings.isDefined(text)){
        return `${fieldName} is required.`;
    }

    return "";
};

module.exports.getNameError = (name, fieldName) => {
    if(!strings.isString(name)) {
        return `${fieldName} must be a string`;
    } else if(!strings.isDefined(name)){
        return `${fieldName} is required.`;
    } else if(!name.match(regex.name)){
        return `${fieldName} cannot contain any special characters besides dashes, ` +
            `underscores and spaces.`;
    } else if(name.length < 2 || name.length > 64){
        return `${fieldName} must be between 2 and 64 characters`;
    }

    return "";
};

module.exports.getNumberError = (number, fieldName) => {
    if(isNaN(number) || !strings.isDefined(number)){
        return `${fieldName} is required.`;
    }

    return "";
};

module.exports.getPasswordError = (password) => {
    if(!strings.isString(password)){
        return "Password must be a string";
    } else if(
        password.length < 8 || password.length > 1000 ||
        !strings.hasLowerCase(password) || !strings.hasUpperCase(password) ||
        !strings.hasSpecialCharacters(password)
    ){
        return (
            "The password must be at least 8 characters long with a mix of uppercase and " +
            "lowercase letters and symbols."
        );
    }

    return "";
};

module.exports.getEthereumAddressError = (walletAddress, fieldName = "The address") => {
    if(!strings.isString(walletAddress)) {
        return `${fieldName} must be a string`;
    } else if(!walletAddress.startsWith("0x") || walletAddress.length !== 42){
        return `${fieldName} must start with 0x and be 42 characters long.`;
    }

    return "";
};

module.exports.getUsernameError = (username) => {
    if(!strings.isString(username)) {
        return "The username must be a string";
    } else if(!username.match(regex.username)){
        return "The username must start with a letter and cannot contain " +
            "any special characters besides dashes and underscores.";
    } else if(username.length < 2 || username.length > 64){
        return "The username must be between 2 and 64 characters";
    }

    return "";
};

module.exports.getEmailError = (email, fieldName = "email") => {
    const looksLikeEmail = /\S+@\S+\.\S+/g;

    if(!strings.isString(email)) {
        return `${fieldName} must be a string`;
    } else if(!email.match(looksLikeEmail) || email.length > 64){
        return `Please provide a valid ${fieldName} address`;
    }

    return "";
};

module.exports.getGrecaptchaError = () => {
    if(isClient()){
        if(grecaptcha === undefined){
            return "Error loading ReCAPTCHA. Please try again later.";
        } else if(!strings.isDefined(grecaptcha.getResponse())){
            return "Please verify that you're not a robot.";
        }
    }

    return "";
};