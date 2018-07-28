import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import validation from '../../../services/validation';
import strings from '../../../services/strings';
import objects from '../../../services/objects';
import {recaptchaSiteKey} from "../../clientSettings";
import RecaptchaWidget from '../../modules/RecaptchaWidget';
import axios from 'axios';
import urls from '../../../services/urls';
import roles from '../../../services/roles';
import {LoaderTiny} from "../../modules/icons";

class RegisterForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {
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
            },
            isLoading: false,
        };
    }

    addFieldErrors = (usernameError, passwordError = '', emailError = '', grecaptchaError = '') => {
        this.setState(prevState => ({
            fields: {
                usernameField: {
                    ...prevState.fields.usernameField,
                    error: usernameError
                },
                passwordField: {
                    ...prevState.fields.passwordField,
                    error: passwordError
                },
                emailField: {
                    ...prevState.fields.emailField,
                    error: emailError
                },
                grecaptchaField: {
                    ...prevState.fields.grecaptchaField,
                    error: grecaptchaError
                }
            },
            isLoading: false
        }));
    };

    registerUser = ({username, password, email}) => {
        return axios.post(urls.users, {
            username,
            email,
            password,
            role: roles.supplier,
            walletAddress: this.props.metamaskAccount.address,
            grecaptcha: grecaptcha.getResponse()
        });
    };

    handleSubmit = ({username, password, email}) => {
        const {isDefined} = strings;
        const usernameError = validation.getUsernameError(username);
        const passwordError = validation.getPasswordError(password);
        const emailError = validation.getEmailError(email);
        const grecaptchaError = validation.getGrecaptchaError();

        if (!isDefined(usernameError) && !isDefined(passwordError) &&
                !isDefined(emailError) && !isDefined(grecaptchaError)) {
            this.setState({isLoading: true});

            this.registerUser({username, password, email})
                .then(res => {
                    if(res.status !== 200){
                        throw new Error('Bad Request');
                    } else {
                        //TODO: Tell user about registration + confirmation message
                    }
                })
                .catch(err => {
                    console.error(err);
                    grecaptcha.reset();
                    this.addFieldErrors('The entered username already exists.');
                });
        } else {
            this.addFieldErrors(usernameError, passwordError, emailError, grecaptchaError);
        }
    };

    render(){
        return (
            <Fragment>
                <FormList
                    onSubmit={this.handleSubmit}
                    fields={objects.values(this.state.fields)}
                    submitButtonHtml={(this.state.isLoading) ? <LoaderTiny/> : "Register"}
                >
                    <RecaptchaWidget siteKey={recaptchaSiteKey}/>
                </FormList>
            </Fragment>
        );
    }
}

export default RegisterForm;