import React, {Component} from 'react';
import FormList from '../../modules/FormList';
import objects from '../../../services/objects';
import axios from 'axios';
import urls from '../../../services/urls';
import paths, {redirect} from '../../../services/paths';
import {connect} from 'react-redux';

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

    addFieldErrors = (usernameError, passwordError = '') => {
        this.setState(prevState => ({
            usernameField: {
                ...prevState.usernameField,
                error: usernameError
            },
            passwordField: {
                ...prevState.passwordField,
                error: passwordError
            }
        }));
    };

    login = (username, password) => {
        return axios.post(urls.sessions, {username, password});
    };

    handleSubmit = ({username, password}) => {
        this.login(username, password)
            .then(res => {
                if(res.status !== 200){
                    this.addFieldErrors('Invalid username or password.');
                } else {
                    redirect(paths.pages.admin);
                }
            });
    };

    render(){
        return (
            <FormList
                onSubmit={this.handleSubmit}
                fields={objects.values(this.state)}
                submitButtonHtml="Login"
            />
        );
    }
}

export default connect()(LoginForm);