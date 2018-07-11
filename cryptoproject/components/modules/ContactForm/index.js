import React, {Component} from 'react';
import axios from "axios/index";
import urls from "../../../server/services/utils/urls";
import Strings from "../../../services/Strings";
import {looksLikeEmail} from '../../../server/services/utils/validation';
import RecaptchaWidget from '../widgets/RecaptchaWidget';
import {LoaderTiny} from "../icons";

class ContactForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            website: '',
            message: '',
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

    getFormValidation(){
        const {
            name,
            email
        } = this.state;

        const validation = {
            errors: [],
            fieldsWithErrors: []
        };

        if(!Strings.isDefined(name)){
            validation.fieldsWithErrors.push('name');
            validation.errors.push('Please enter your name.');
        }

        if(!Strings.isDefined(email)){
            validation.fieldsWithErrors.push('email');
            validation.errors.push('Please enter your email.');
        } else if(!looksLikeEmail(email)){
            validation.errors.push('Please enter a valid email address.');
            validation.fieldsWithErrors.push('email');
        }

        if(grecaptcha === undefined){
            validation.errors.push('Error loading ReCAPTCHA. Please try again later.');
            validation.fieldsWithErrors.push('recaptcha');
        } else if(!Strings.isDefined(grecaptcha.getResponse())){
            validation.errors.push('Please verify that you\'re not a robot.');
            validation.fieldsWithErrors.push('recaptcha');
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
                grecaptcha: grecaptcha.getResponse()
            }).then(response => {
                console.log(response);
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
                        <textarea disabled={complete} cols={5} onChange={event => {
                            this.setState({
                                message: event.target.value
                            });
                        }}/>
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