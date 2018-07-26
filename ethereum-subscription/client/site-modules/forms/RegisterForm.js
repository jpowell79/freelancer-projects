import React, {Component} from 'react';
import FormList from '../../modules/FormList';
import validation from '../../../services/validation';
import {isDefined} from '../../../services/strings';
import objects from '../../../services/objects';
import {recaptchaSiteKey} from "../../content";
import RecaptchaWidget from '../../modules/RecaptchaWidget';

class RegisterForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            usernameField: {
                type: 'username',
                label: 'Public Supplier name:',
                error: ''
            },
            emailField: {
                type: 'email',
                label: 'Email:',
                error: '',
            },
            passwordField: {
                type: 'password',
                label: 'Password:',
                error: ''
            },
            grecaptchaField: {
                type: 'hidden',
                error: ''
            }
        };
    }

    addFieldErrors = (usernameError, passwordError, emailError, grecaptchaError) => {
        this.setState(prevState => ({
            usernameField: {
                ...prevState.usernameField,
                error: usernameError
            },
            passwordField: {
                ...prevState.passwordField,
                error: passwordError
            },
            emailField: {
                ...prevState.emailField,
                error: emailError
            },
            grecaptchaField: {
                ...prevState.grecaptchaField,
                error: grecaptchaError
            }
        }));
    };

    handleRegister = () => {
        //TODO: Implement handleLogin
    };

    handleSubmit = ({username, password, email}) => {
        const usernameError = validation.getUsernameError(username);
        const passwordError = validation.getPasswordError(password);
        const emailError = validation.getEmailError(email);
        const grecaptchaError = validation.getGrecaptchaError();

        if (!isDefined(usernameError) && !isDefined(passwordError) && !isDefined(emailError)) {
            this.handleRegister();
        } else {
            this.addFieldErrors(usernameError, passwordError, emailError, grecaptchaError);
        }
    };

    render(){
        return (
            <FormList
                onSubmit={this.handleSubmit}
                fields={objects.values(this.state)}
                submitButtonText="Login"
            >
                <RecaptchaWidget siteKey={recaptchaSiteKey}/>
            </FormList>
        );
    }
}

export default RegisterForm;