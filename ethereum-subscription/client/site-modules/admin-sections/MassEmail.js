import React, {Component, Fragment} from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios';
import {urls, mailTypes} from '../../../services/constants';
import withMessage from '../../hocs/withMessage';
import {LoaderTiny} from "../../modules/icons";

class MassEmail extends Component {
    handleSubmit = () => {
        if(this.props.hasFieldErrors()) return;

        this.props.setIsLoading();

        return axios.post(`${urls.email}/${mailTypes.massMailSuppliers}`, {
            subject: this.props.messageState.subject,
            body: this.props.messageState.body
        }).then(() => {
            this.props.setComplete({
                successTitle: 'The emails was sent successfully!',
            });
        }).catch(() => {
            this.props.setMessageState({
                isLoading: false,
                errors: []
            });
        });
    };

    render(){
        const {
            messageState,
            setMessageState,
            renderMessages,
        } = this.props;

        const {
            fieldsWithErrors,
            isLoading,
            complete,
            subject,
            body
        } = messageState;

        return (
            <Fragment>
                {renderMessages()}
                <h2>Mass Email to Suppliers</h2>
                <Form>
                    <Form.Field error={fieldsWithErrors.includes('subject')}>
                        <label>Subject:</label>
                        <input
                            type="text"
                            disabled={isLoading || complete}
                            value={subject}
                            onChange={(event) => {
                                setMessageState({
                                    subject: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field error={fieldsWithErrors.includes('body')}>
                        <label>Body:</label>
                        <textarea
                            value={body}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({
                                    body: event.target.value
                                });
                            }}
                            rows={8}
                        />
                    </Form.Field>
                    <hr className="ui divider"/>
                    <button
                        className="ui primary button"
                        onClick={this.handleSubmit}>
                        {(isLoading) ? <LoaderTiny/> : "Send"}
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default withMessage(MassEmail, {
    subject: '',
    body: '',
    isLoading: false,
    complete: false
});