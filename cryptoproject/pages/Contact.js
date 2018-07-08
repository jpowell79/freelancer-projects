import React, {Component} from 'react';
import Page from '../components/containers/Page';
import FullWidthSegment from "../components/containers/FullWidthSegment";
import {PageTitle} from "../components/modules/PageTitle";
import ContactForm from "../components/modules/ContactForm";
import RecaptchaWidget from "../components/modules/widgets/RecaptchaWidget";

class Contact extends Component {
    render(){
        const {
            skinny
        } = FullWidthSegment.options;

        return (
            <Page addTimer={true} head={RecaptchaWidget.SCRIPT}>
                <PageTitle title="Contact Form" className="elegant text-center">
                    <p className="h3 wrapper-3">
                        We welcome any questions, comments, suggestions or general enquires.
                        Please allow up to 24 hours for a response.
                    </p>
                </PageTitle>
                <FullWidthSegment options={[skinny]} wrapper={3}>
                    <ContactForm/>
                </FullWidthSegment>
                <FullWidthSegment/>
            </Page>
        )
    }
}

export default Contact;