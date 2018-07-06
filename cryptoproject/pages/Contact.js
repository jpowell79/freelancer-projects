import React, {Component} from 'react';
import Page from '../components/containers/Page';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import {PageTitle} from "../components/modules/PageTitle";
import axios from 'axios';
import urls from '../server/services/utils/urls';

class Contact extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            website: '',
            message: ''
        }

        //TODO: Basic validation
        //TODO: Add Recaptcha

        //Email validation: \S+@\S+
    }

    render(){
        return (
            <Page addTimer={true}>
                <PageTitle title="Contact Form" className="elegant text-center">
                    <p className="h3 wrapper-3">
                        We welcome any questions, comments, suggestions or general enquires.
                        Please allow up to 24 hours for a response.
                    </p>
                </PageTitle>
                <FullWidthSegment options={['skinny']} wrapper={3}>
                    <form className="ui form">
                        <div className="field">
                            <label>Name (required)</label>
                            <input type="text" onChange={event => {
                                this.setState({
                                    name: event.target.value
                                });
                            }}/>
                        </div>
                        <div className="field">
                            <label>Email (required)</label>
                            <input type="text" onChange={event => {
                                this.setState({
                                    email: event.target.value
                                });
                            }}/>
                        </div>
                        <div className="field">
                            <label>Website</label>
                            <input type="text" defaultValue="http://" onChange={event => {
                                this.setState({
                                    website: event.target.value
                                });
                            }}/>
                        </div>
                        <div className="field">
                            <label>Message</label>
                            <textarea cols={5} onChange={event => {
                                this.setState({
                                    message: event.target.value
                                });
                            }}/>
                        </div>
                        <button className="ui primary button" onClick={(event) => {
                            event.preventDefault();

                            axios.post(urls.email, {
                                name: this.state.name,
                                email: this.state.email,
                                website: this.state.website,
                                message: this.state.message
                            }).then(response => {
                                console.log(response);
                            });
                        }}>Send E-mail</button>
                    </form>
                </FullWidthSegment>
                <FullWidthSegment/>
            </Page>
        )
    }
}

export default Contact;