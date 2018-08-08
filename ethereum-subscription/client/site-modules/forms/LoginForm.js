import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import axios from 'axios';
import urls from '../../../services/constants/urls';
import paths, {redirect} from '../../../services/constants/paths';
import {connect} from 'react-redux';
import {LoaderTiny} from "../../modules/icons";
import roles from '../../../services/constants/roles';
import withMessage from '../../hocs/withMessage';

class LoginForm extends Component {
    static fields = [
        {
            type: 'username',
            label: 'Username:'
        },
        {
            type: 'password',
            label: 'Password:'
        }
    ];

    login = (username, password) => {
        return axios.post(urls.sessions, {username, password});
    };

    handleSubmit = ({username, password}) => {
        this.props.setMessageState({
            errors: [],
            isLoading: true
        });

        this.login(username, password)
            .then(res => {
                if(typeof res.data === 'string'){
                    this.props.setMessageState({
                        errors: [res.data.toString().split("Error: ")[1]],
                        isLoading: false
                    });
                } else {
                    if(res.data.role === roles.admin){
                        redirect(paths.pages.admin);
                    } else {
                        redirect(paths.pages.supplier);
                    }
                }
            })
            .catch(() => {
                this.props.setMessageState({
                    errors: ['Something went wrong when processing the request.'],
                    isLoading: false
                });
            });
    };

    render(){
        return (
            <Fragment>
                {this.props.renderMessages()}
                <FormList
                    validate={false}
                    onSubmit={this.handleSubmit}
                    disabled={this.props.messageState.isLoading}
                    fields={LoginForm.fields}
                    submitButtonHtml={this.props.messageState.isLoading ? <LoaderTiny/> : "Login"}
                />
            </Fragment>
        );
    }
}

export default withMessage(connect()(LoginForm));