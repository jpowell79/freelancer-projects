import React, {Component} from 'react';
import axios from "axios/index";
import urls from "../../../server/services/utils/urls";
import Strings from "../../../services/Strings/index";
import {looksLikeEmail} from '../../../server/services/utils/validation';
import RecaptchaWidget from '../widgets/RecaptchaWidget/index';
import {LoaderTiny} from "../icons/index";
import {
    MAX_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
    MAX_MESSAGE_LENGTH,
    MAX_WEBSITE_LENGTH
} from '../../../site-settings';

class ContactForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            website: '',
            message: '',
            walletAddress: '',
            formValidation: {
                errors: [],
                fieldsWithErrors: [],
                complete: false
            },
            isSendingEmail: false
        };

        this.getFormValidation = this.getFormValidation.bind(this);
        this.getFieldClass = this.getFieldClass.bind(this);
        this.renderErrorMessages = this.renderErrorMessages.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    static getNameError(name){
        if(!Strings.isDefined(name)){
            return 'Please enter your name.';
        }

        if(name.length > MAX_NAME_LENGTH){
            return `Your name cannot be longer than ${MAX_NAME_LENGTH} characters`;
        }

        return '';
    }

    static getEmailError(email){
        if(!Strings.isDefined(email)){
            return 'Please enter your email.';
        } else if(email.length > MAX_EMAIL_LENGTH){
            return `Your email cannot be longer than ${MAX_EMAIL_LENGTH} characters.`;
        } else if(!looksLikeEmail(email)){
            return 'Please enter a valid email address.';
        }

        return '';
    }

    static getGrecaptchaError(){
        if(grecaptcha === undefined){
            return 'Error loading ReCAPTCHA. Please try again later.';
        } else if(!Strings.isDefined(grecaptcha.getResponse())){
            return 'Please verify that you\'re not a robot.';
        }

        return '';
    }

    static getMessageError(message){
        if(message.length > MAX_MESSAGE_LENGTH){
            return `Your message cannot be longer than ${MAX_MESSAGE_LENGTH} characters.`;
        }

        return '';
    }

    static getWalletAddressError(walletAddress){
        if(!Strings.isDefined(walletAddress)){
            return '';
        }

        if(!walletAddress.startsWith('0x') || walletAddress.length !== 42){
            return `Your wallet address should start with 0x and be 42 characters long.`;
        }

        return '';
    }

    static getWebsiteError(website){
        if(!Strings.isDefined(website)){
            return '';
        }

        if(website.length > MAX_WEBSITE_LENGTH){
            return `The website cannot be longer than ${MAX_WEBSITE_LENGTH} characters.`;
        }

        if(!website.includes('.')){
            return 'Please enter a valid website.';
        }

        return '';
    }

    getFormValidation(){
        const {
            name,
            email,
            website,
            message,
            walletAddress
        } = this.state;

        const validation = {
            errors: [],
            fieldsWithErrors: []
        };

        const nameError = ContactForm.getNameError(name);
        const emailError = ContactForm.getEmailError(email);
        const walletAddressError = ContactForm.getWalletAddressError(walletAddress);
        const websiteError = ContactForm.getWebsiteError(website);
        const messageError = ContactForm.getMessageError(message);
        const grecaptchaError = ContactForm.getGrecaptchaError();

        if(nameError !== ''){
            validation.fieldsWithErrors.push('name');
            validation.errors.push(nameError);
        }

        if(emailError !== ''){
            validation.fieldsWithErrors.push('email');
            validation.errors.push(emailError);
        }

        if(walletAddressError !== ''){
            validation.fieldsWithErrors.push('walletAddress');
            validation.errors.push(walletAddressError);
        }

        if(websiteError !== ''){
            validation.fieldsWithErrors.push('website');
            validation.errors.push(websiteError);
        }

        if(messageError !== ''){
            validation.fieldsWithErrors.push('message');
            validation.errors.push(messageError);
        }

        if(grecaptchaError !== ''){
            validation.fieldsWithErrors.push('recaptcha');
            validation.errors.push(grecaptchaError);
        }

        return validation;
    }

    getFieldClass(field){
        return (this.state.formValidation.fieldsWithErrors.includes(field))
            ? 'field error'
            : 'field'
    }

    renderErrorMessages(){
        if(this.state.formValidation.errors.length === 0){
            return null;
        }

        return (
            <div className="ui error message" style={{
                marginBottom: "3em"
            }}>
                <ul>
                    {this.state.formValidation.errors.map((error, i) => {
                        return (
                            <li key={i}>{error}</li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    handleFormSubmit(event){
        if(this.state.isSendingEmail) return;

        event.preventDefault();

        const formValidation = this.getFormValidation();

        this.setState({formValidation});

        if(formValidation.fieldsWithErrors.length === 0){
            this.setState({isSendingEmail: true});

            axios.post(urls.email, {
                name: this.state.name,
                email: this.state.email,
                website: this.state.website,
                message: this.state.message,
                walletAddress: this.state.walletAddress,
                grecaptcha: grecaptcha.getResponse()
            }).then(response => {
                formValidation.complete = true;

                if(!response.data.grecaptchaValidation.success){
                    formValidation.errors.push(
                        'An error occurred when validating the ReCAPTCHA.'
                    );
                }

                this.setState({
                    formValidation,
                    isSendingEmail: false
                });
            });
        }
    }

    render(){
        const {
            complete,
            errors
        } = this.state.formValidation;

        return (
            <React.Fragment>
                {this.renderErrorMessages()}
                <form className="ui form">
                    <div className={this.getFieldClass('name')}>
                        <label>Name (required)</label>
                        <input
                            disabled={complete}
                            type="text"
                            onChange={event => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}/>
                    </div>
                    <div className={this.getFieldClass('email')}>
                        <label>Email (required)</label>
                        <input
                            disabled={complete}
                            type="email"
                            onChange={event => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}/>
                    </div>
                    <div className={this.getFieldClass('walletAddress')}>
                        <label>Ethereum Wallet</label>
                        <input
                            placeholder="0x"
                            disabled={complete}
                            type="url"
                            onChange={event => {
                                this.setState({
                                    walletAddress: event.target.value
                                });
                            }}/>
                    </div>
                    <div className={this.getFieldClass('website')}>
                        <label>Website</label>
                        <input
                            disabled={complete}
                            type="url"
                            defaultValue="http://"
                            onChange={event => {
                                this.setState({
                                    website: event.target.value
                                });
                            }}/>
                    </div>
                    <div className={this.getFieldClass('message')}>
                        <label>Message</label>
                        <span className="counter">
                            {MAX_MESSAGE_LENGTH - this.state.message.length}
                        </span>
                        <textarea
                            value={this.state.message}
                            disabled={complete}
                            cols={5}
                            onChange={event => {
                                if(event.target.value.length <= MAX_MESSAGE_LENGTH){
                                    this.setState({
                                        message: event.target.value
                                    });
                                }
                            }}
                        />
                    </div>
                    <div className={this.getFieldClass('recaptcha')}>
                        <RecaptchaWidget/>
                    </div>
                    <button
                        disabled={complete}
                        className="ui primary button"
                        onClick={this.handleFormSubmit}>
                        {(this.state.isSendingEmail)
                            ? <LoaderTiny className="secondary"/>
                            : "Send E-mail"}
                    </button>
                </form>
                {(complete && errors.length === 0) && (
                    <div className="ui success message">
                        <div className="header">
                            Your message has been sent!
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default ContactForm;