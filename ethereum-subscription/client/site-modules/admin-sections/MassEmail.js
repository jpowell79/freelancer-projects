import React, {Component, Fragment} from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios';
import {urls, mailTypes} from '../../../services/constants';
import withMessage from '../../config/withMessage';
import {LoaderTiny} from "../../modules/icons";
import validation from '../../../services/validation';
import strings from '../../../services/strings';

class MassEmail extends Component {
    hasValidFields = () => {
        const errors = Object.keys(this.props.messageState)
            .map(key => validation.getFieldError(key, this.props.messageState[key]))
            .filter(error => strings.isDefined(error));

        if(errors.length > 0){
            this.props.setMessageState({errors});
            return false;
        }

        return true;
    };

    handleSubmit = () => {
        if(!this.hasValidFields()) return;

        this.props.setMessageState({
            isLoading: true,
            errors: []
        });

        return axios.post(`${urls.email}/${mailTypes.massMailSuppliers}`, {
            subject: this.props.messageState.subject,
            body: this.props.messageState.body
        }).then(() => {
            this.props.setMessageState({
                isLoading: false,
                successTitle: 'The emails was sent successfully!',
                showSuccess: true,
                complete: true
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
            renderMessages
        } = this.props;

        const {
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
                    <Form.Field>
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
                    <Form.Field>
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