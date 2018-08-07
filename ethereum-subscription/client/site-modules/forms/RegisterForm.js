import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import {recaptchaSiteKey} from "../../clientSettings";
import RecaptchaWidget from '../../modules/RecaptchaWidget';
import axios from 'axios';
import urls from '../../../services/constants/urls';
import roles from '../../../services/constants/roles';
import {LoaderTiny} from "../../modules/icons";
import withMessage from '../../hoc/withMessage';

class RegisterForm extends Component {
    static fields = [
        {
            type: 'username',
            label: 'Username:'
        },
        {
            type: 'email',
            label: 'Email:'
        },
        {
            type: 'password',
            label: 'Password:'
        },
        {
            type: 'grecaptcha',
            hidden: true
        }
    ];

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
        this.props.setMessageState({
            isLoading: true,
            showSuccess: false,
            errors: []
        });

        this.registerUser({username, password, email})
            .then(res => {
                if(typeof res.data === 'string' && res.data.startsWith("Error: ")){
                    grecaptcha.reset();
                    this.props.setMessageState({
                        errors: [res.data.toString().split("Error: ")[1]],
                        isLoading: false
                    });
                } else {
                    this.props.setMessageState({
                        isLoading: false,
                        showSuccess: true,
                        successTitle: 'Your registration was completed successfully.',
                        success: [
                            'Check your email to activate the account. ' +
                            'It will expire after 1 hour.'
                        ]
                    });
                }
            })
            .catch(err => {
                console.error(err);
                grecaptcha.reset();
                this.props.setMessageState({
                    errors: ['Something went wrong when processing the request.'],
                    isLoading: false,
                });
            });
    };

    render(){
        const {messageState} = this.props;

        return (
            <Fragment>
                {this.props.renderMessages()}
                <FormList
                    onSubmit={this.handleSubmit}
                    onError={() => {
                        this.props.setMessageState({
                            errors: [],
                            showSuccess: false
                        });
                    }}
                    disabled={messageState.isLoading || messageState.showSuccess}
                    fields={RegisterForm.fields}
                    submitButtonHtml={(messageState.isLoading) ? <LoaderTiny/> : "Register"}
                >
                    <RecaptchaWidget siteKey={recaptchaSiteKey}/>
                </FormList>
            </Fragment>
        );
    }
}

export default withMessage(RegisterForm);