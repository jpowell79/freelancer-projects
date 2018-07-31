import React, {Component} from 'react';
import FormList from '../../modules/FormList';
import objects from '../../../services/objects';
import axios from 'axios';
import urls from '../../../services/constants/urls';
import paths, {redirect} from '../../../services/constants/paths';
import {connect} from 'react-redux';
import {LoaderTiny} from "../../modules/icons";
import roles from '../../../services/constants/roles';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {
                usernameField: {
                    type: 'username',
                    label: 'Username:',
                    error: false
                },
                passwordField: {
                    type: 'password',
                    label: 'Password:',
                    error: false
                }
            },
            isLoading: false,
        };
    }

    addFieldErrors = (usernameError, passwordError = '') => {
        this.setState(prevState => ({
            fields: {
                usernameField: {
                    ...prevState.fields.usernameField,
                    error: usernameError
                },
                passwordField: {
                    ...prevState.fields.passwordField,
                    error: passwordError
                }
            },
            isLoading: false
        }));
    };

    login = (username, password) => {
        return axios.post(urls.sessions, {username, password});
    };

    handleSubmit = ({username, password}) => {
        this.login(username, password)
            .then(res => {
                if(typeof res.data === 'string'){
                    this.addFieldErrors(res.data.toString().split("Error: ")[1], true);
                } else {
                    if(res.data.role === roles.admin){
                        redirect(paths.pages.admin);
                    } else {
                        redirect(paths.pages.supplier);
                    }
                }
            })
            .catch(err => {
                console.error(err);
                this.addFieldErrors('Something went wrong when processing the request.', true);
            });
    };

    render(){
        return (
            <FormList
                onSubmit={this.handleSubmit}
                disabled={this.state.isLoading}
                fields={objects.values(this.state.fields)}
                submitButtonHtml={this.state.isLoading ? <LoaderTiny/> : "Login"}
            />
        );
    }
}

export default connect()(LoginForm);