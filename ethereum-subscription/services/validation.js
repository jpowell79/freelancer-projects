const strings = require('./strings');

module.exports.getFieldError = (fieldName, field) => {
    switch(fieldName){
    case 'username':
        return module.exports.getUsernameError(field);
    case 'password':
        return module.exports.getPasswordError(field);
    case 'email':
    case 'contactDetails':
        return module.exports.getEmailError(field, strings.spaceCamelCase(fieldName));
    case 'grecaptcha':
        return module.exports.getGrecaptchaError();
    case 'walletAddress':
    case 'smartContractAddress':
    case 'supplierWalletAddress':
        return module.exports.getWalletAddressError(field, strings.spaceCamelCase(fieldName));
    case 'subscriptionName':
        return module.exports.getNameError(field, strings.spaceCamelCase(fieldName));
    case 'exitFee':
    case 'joinFee':
    case 'subscriptionPrice':
    case 'subscriptionLengthInWeeks':
        return module.exports.getNumberError(field, strings.spaceCamelCase(fieldName));
    case 'subscriptionType':
    case 'subject':
    case 'body':
        return module.exports.getTextError(field, strings.spaceCamelCase(fieldName));
    default:
        return '';
    }
};

module.exports.getTextError = (text, fieldName) => {
    if(typeof text !== 'string') {
        return `${fieldName} must be a string`;
    } else if(!strings.isDefined(text)){
        return `${fieldName} is required.`;
    }

    return '';
};

module.exports.getNameError = (name, fieldName) => {
    const lettersOrNumbersOrDashesOrUnderscoresOrSpaces = /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/g;

    if(typeof name !== 'string') {
        return `${fieldName} must be a string`;
    } else if(!strings.isDefined(name)){
        return `${fieldName} is required.`;
    } else if(!name.match(lettersOrNumbersOrDashesOrUnderscoresOrSpaces)){
        return `${fieldName} cannot contain any special characters besides dashes, ` +
            `underscores and spaces.`;
    } else if(name.length < 2 || name.length > 64){
        return `${fieldName} must be between 2 and 64 characters`;
    }

    return '';
};

module.exports.getNumberError = (number, fieldName) => {
    if(isNaN(number) || !strings.isDefined(number)){
        return `${fieldName} is required and must be a number.`;
    }

    return '';
};

module.exports.getPasswordError = (password) => {
    if(typeof password !== 'string'){
        return 'Password must be a string';
    } else if(
        password.length < 8 || password.length > 1000 ||
        !strings.hasLowerCase(password) || !strings.hasUpperCase(password) ||
        !strings.hasSpecialCharacters(password)
    ){
        return (
            'The password must be at least 8 characters long with a mix of uppercase and ' +
            'lowercase letters and symbols.'
        );
    }

    return '';
};

module.exports.getWalletAddressError = (walletAddress, fieldName = 'The address') => {
    if(typeof walletAddress !== 'string') {
        return `${fieldName} must be a string`;
    } else if(!walletAddress.startsWith('0x') || walletAddress.length !== 42){
        return `${fieldName} must start with 0x and be 42 characters long.`;
    }

    return '';
};

module.exports.getUsernameError = (username) => {
    const lettersOrNumbersOrDashesOrUnderscores = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g;

    if(typeof username !== 'string') {
        return 'The username must be a string';
    } else if(!username.match(lettersOrNumbersOrDashesOrUnderscores)){
        return 'The username must start with a letter and cannot contain ' +
            'any special characters besides dashes and underscores.';
    } else if(username.length < 2 || username.length > 64){
        return 'The username must be between 2 and 64 characters';
    }

    return '';
};

module.exports.getEmailError = (email, fieldName = 'email') => {
    const looksLikeEmail = /\S+@\S+\.\S+/g;

    if(typeof email !== 'string') {
        return `${fieldName} must be a string`;
    } else if(!email.match(looksLikeEmail) || email.length > 64){
        return `Please provide a valid ${fieldName} address`;
    }

    return '';
};

module.exports.getGrecaptchaError = () => {
    if(grecaptcha === undefined){
        return 'Error loading ReCAPTCHA. Please try again later.';
    } else if(!strings.isDefined(grecaptcha.getResponse())){
        return 'Please verify that you\'re not a robot.';
    }

    return '';
};