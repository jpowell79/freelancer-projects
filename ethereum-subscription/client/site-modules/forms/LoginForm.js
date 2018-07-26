import React, {Component} from 'react';
import FormList from '../../modules/FormList';
import validation from '../../../services/validation';
import {isDefined} from '../../../services/strings';
import objects from '../../../services/objects';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            usernameField: {
                type: 'username',
                label: 'Username:',
                error: ''
            },
            passwordField: {
                type: 'password',
                label: 'Password:',
                error: ''
            }
        };
    }

    addFieldErrors = (usernameErrors, passwordErrors) => {
        this.setState(prevState => ({
            usernameField: {
                ...prevState.usernameField,
                error: usernameErrors
            },
            passwordField: {
                ...prevState.passwordField,
                error: passwordErrors
            }
        }));
    };

    handleLogin = () => {
        //TODO: Implement handleLogin
    };

    handleSubmit = ({username, password}) => {
        const usernameErrors = validation.getUsernameError(username);
        const passwordErrors = validation.getPasswordError(password);

        if (!isDefined(usernameErrors) && !isDefined(passwordErrors)) {
            this.handleLogin();
        } else {
            this.addFieldErrors(usernameErrors, passwordErrors);
        }
    };

    render(){
        return (
            <FormList
                onSubmit={this.handleSubmit}
                fields={objects.values(this.state)}
                submitButtonText="Login"
            />
        );
    }
}

export default LoginForm;