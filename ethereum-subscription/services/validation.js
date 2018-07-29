const strings = require('./strings');

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

module.exports.getWalletAddressError = (walletAddress) => {
    if(typeof walletAddress !== 'string') {
        return 'The walletAddress must be a string';
    } else if(!walletAddress.startsWith('0x') || walletAddress.length !== 42){
        return 'The walletAddress must start with 0x and be 42 characters long.';
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

module.exports.getEmailError = (email) => {
    const looksLikeEmail = /\S+@\S+\.\S+/g;

    if(typeof email !== 'string') {
        return 'Email must be a string';
    } else if(!email.match(looksLikeEmail) || email.length > 64){
        return 'Please provide a valid email address';
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