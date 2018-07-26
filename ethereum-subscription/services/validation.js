const strings = require('./strings');

module.exports.getPasswordError = (password) => {
    if(typeof password !== 'string'){
        return 'Password must be a string';
    } else if(password.length < 6 || password.length > 64){
        return 'The password must be between 6 and 64 characters';
    }

    return '';
};

module.exports.getUsernameError = (username) => {
    const regex = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/g;

    if(typeof username !== 'string') {
        return 'Username must be a string';
    } else if(!username.match(regex)){
        return 'The username must start with a letter and cannot contain ' +
            'any special characters besides dash and underscore.';
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