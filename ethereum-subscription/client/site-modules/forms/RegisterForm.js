import React, {Component, Fragment} from 'react';
import FormList from '../../modules/FormList';
import {RECAPTCHA_SITE_KEY} from "../../clientSettings";
import RecaptchaWidget from '../../modules/RecaptchaWidget';
import axios from 'axios';
import urls from '../../../services/constants/urls';
import roles from '../../../services/constants/roles';
import {Loader, LoaderTiny} from "../../modules/icons";
import withMessage from '../../hocs/withMessage';
import withMetamaskAccount from '../../hocs/withMetamaskAccount';
import objects from "../../../services/objects";
import {isClient} from "../../../services/utils";
import HideFragment from "../../containers/HideFragment";
import {getErrorString} from "../../services/utils";
import {Message} from 'semantic-ui-react';

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
            .then(() => {
                this.props.setMessageState({
                    isLoading: false,
                    showSuccess: true,
                    successTitle: 'Your registration was completed successfully.',
                    success: [
                        'Check your email to activate the account. ' +
                        'It will expire after 1 hour.'
                    ]
                });
            })
            .catch(err => {
                grecaptcha.reset();
                this.props.setMessageState({
                    errors: [getErrorString(err)],
                    isLoading: false,
                });
            });
    };

    renderMetamaskAccountNotFound = () => {
        if(!isClient()) return null;

        if(!window.web3){
            return <p className="text">You need metamask in order to create an account.</p>;
        }

        return <p className="text">Login to metamask in order to create an account.</p>;
    };

    render(){
        const {
            messageState,
            metamaskAccount
        } = this.props;

        if(this.props.metamaskAccount.isLoading){
            return (
                <div className="text-center">
                    <Loader/>
                    <h3>Listening for account changes...</h3>
                </div>
            );
        }

        if(objects.isEmpty(metamaskAccount)){
            return (
                <HideFragment>
                    {this.renderMetamaskAccountNotFound()}
                </HideFragment>
            );
        }

        return (
            <Fragment>
                {this.props.renderMessages()}
                <Message
                    info
                    header="The following wallet address will be associated with your account:"
                    list={[metamaskAccount.address]}
                />
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
                    <RecaptchaWidget siteKey={RECAPTCHA_SITE_KEY}/>
                </FormList>
            </Fragment>
        );
    }
}

export default withMessage(withMetamaskAccount(RegisterForm));