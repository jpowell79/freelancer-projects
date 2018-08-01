import React, {Component, Fragment} from 'react';
import {Form} from 'semantic-ui-react';

class MassEmail extends Component {
    constructor(props){
        super(props);

        this.state = {
            subject: '',
            body: ''
        }
    }

    handleSubmit = () => {
        //TODO: Implement Mass Email logic
    };

    render(){
        return (
            <Fragment>
                <h2>Mass Email to Suppliers</h2>
                <Form>
                    <Form.Field>
                        <label>Subject:</label>
                        <input
                            type="text"
                            value={this.state.subject}
                            onChange={(event) => {
                                this.setState({
                                    subject: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Body:</label>
                        <textarea
                            value={this.state.subject}
                            onChange={(event) => {
                                this.setState({
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
                        Send
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default MassEmail;