import React, {Component, Fragment} from 'react';
import withMessage from '../../hocs/withMessage';
import {Form} from 'semantic-ui-react';
import {LoaderTiny} from "../../modules/icons";
import PropTypes from 'prop-types';

class AddContractTypeForm extends Component {
    static defaultProps = {
        submitButtonText: 'Submit'
    };

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        submitButtonText: PropTypes.string
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this);
    };

    render(){
        const {
            messageState,
            renderMessages,
            setMessageState,
        } = this.props;

        const {
            fieldsWithErrors,
            isLoading,
            complete
        } = messageState;

        return (
            <Fragment>
                {renderMessages()}
                <Form>
                    <Form.Field error={
                        fieldsWithErrors.includes('contractType')
                    }>
                        <label>Contract Type</label>
                        <input
                            type="text"
                            value={messageState.contractType}
                            disabled={isLoading || complete}
                            onChange={(event) => {
                                setMessageState({contractType: event.target.value});
                            }}
                        />
                    </Form.Field>
                    <button
                        className="ui primary button"
                        onClick={this.handleSubmit}>
                        {(isLoading)
                            ? <LoaderTiny/>
                            : this.props.submitButtonText}
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default withMessage(AddContractTypeForm, {
    contractType: ''
});