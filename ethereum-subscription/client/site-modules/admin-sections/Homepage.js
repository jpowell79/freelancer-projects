import React, {Component, Fragment} from 'react';
import {Form} from 'semantic-ui-react';
import FileInput from '../../modules/FileInput';
import ColorPicker from '../../modules/ColorPicker';
import withSettingsEditor from '../../hocs/withSettingsEditor';

class Homepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            homepageBanner: null,
            homepageBannerOverlayColor: null,
            homepageBannerTextColor: null,
            homepageTableMaxRows: null
        };
    }

    render(){
        const {
            homepageBanner,
            homepageBannerOverlayColor,
            homepageBannerTextColor,
            homepageTableMaxRows
        } = this.props.getDefaultsOrState(this.state);

        return (
            <Fragment>
                <Form>
                    <Form.Field>
                        <FileInput
                            label="Banner Image:"
                            buttonContent="Browse"
                            placeholder={
                                (homepageBanner.value.name)
                                    ? homepageBanner.value.name
                                    : homepageBanner.value
                            }
                            onFileUploaded={(file) => {
                                this.setState({
                                    homepageBanner: {
                                        value: file
                                    }
                                });
                            }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Overlay Color:</label>
                        <ColorPicker
                            defaultColor={homepageBannerOverlayColor.value}
                            onChange={(color) => {
                                this.setState({
                                    homepageBannerOverlayColor: {
                                        value: color
                                    }
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Text Color:</label>
                        <ColorPicker
                            defaultColor={homepageBannerTextColor.value}
                            onChange={(color) => {
                                this.setState({
                                    homepageBannerTextColor: {
                                        value: color
                                    }
                                });
                            }}
                        />
                    </Form.Field>
                    <h2>Table</h2>
                    <Form.Field>
                        <label>Max Rows:</label>
                        <input
                            type="number"
                            value={homepageTableMaxRows.value}
                            onChange={(event) => {
                                this.setState({
                                    homepageTableMaxRows: {
                                        value: event.target.value
                                    }
                                });
                            }}
                        />
                    </Form.Field>
                </Form>
            </Fragment>
        );
    }
}

export default withSettingsEditor(Homepage, "Banner");