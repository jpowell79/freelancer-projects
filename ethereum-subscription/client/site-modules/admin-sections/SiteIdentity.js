import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import FileInput from '../../modules/FileInput';
import withSettingsEditor from '../../config/withSettingsEditor';

class SiteIdentity extends Component {
    constructor(props){
        super(props);

        this.state = {
            logo: null,
            siteTitle: null
        };
    }

    render(){
        const {
            logo,
            siteTitle
        } = this.props.getDefaultsOrState(this.state);

        return (
            <Form>
                <Form.Field>
                    <FileInput
                        label="Logo:"
                        buttonContent="Browse"
                        placeholder={
                            (logo.value.name)
                                ? logo.value.name
                                : logo.value
                        }
                        onFileUploaded={(file) => {
                            this.setState({
                                logo: {
                                    value: file
                                }
                            });
                        }}/>
                </Form.Field>
                <Form.Field>
                    <label>Site Title:</label>
                    <input
                        type="text"
                        value={siteTitle.value}
                        onChange={(event) => {
                            this.setState({
                                siteTitle: {
                                    value: event.target.value
                                }
                            });
                        }}
                    />
                </Form.Field>
            </Form>
        );
    }
}

export default withSettingsEditor(SiteIdentity, "Site Identity");