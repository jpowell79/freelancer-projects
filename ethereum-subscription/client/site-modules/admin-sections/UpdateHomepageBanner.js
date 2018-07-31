import React, {Component, Fragment} from 'react';
import {Form, Message} from 'semantic-ui-react';
import FileInput from '../../modules/FileInput';
import {connect} from 'react-redux';
import ColorPicker from '../../modules/ColorPicker';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import {LoaderTiny} from "../../modules/icons";
import SettingsUpdater from '../../services/SettingsUpdater';

class UpdateHomepageBanner extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    constructor(props){
        super(props);

        this.state = {
            file: {name: props.settings.homepageBanner.value},
            color: props.settings.homepageBannerOverlayColor.value,
            isSaving: false,
            hasSaved: false,
        };

        this.settingsUpdater = new SettingsUpdater(props.settings);
    }

    handleSave = () => {
        const {file, color} = this.state;
        this.setState({isSaving: true});

        //TODO: Upload image

        Promise.all([
            this.settingsUpdater.updateHomepageBannerOverlayColor(color),
            this.settingsUpdater.updateHomepageBannerImage(file.name)
        ]).then(() => {
            this.setState({
                hasSaved: true,
                isSaving: false
            });
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
        });
    };

    render(){
        return (
            <Fragment>
                {(this.state.hasSaved) && (
                    <Message
                        success
                        header='Your changes have been saved successfully!'
                    />
                )}
                <Form>
                    <Form.Field>
                        <FileInput
                            label="Banner Image:"
                            buttonContent="Browse"
                            placeholder={this.state.file.name}
                            onFileUploaded={(file) => {
                                this.setState({
                                    file,
                                    hasSaved: false,
                                });
                            }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Overlay Color:</label>
                        <ColorPicker
                            defaultColor={this.state.color}
                            onChange={(color) => {
                                this.setState({
                                    color,
                                    hasSaved: false
                                });
                            }}
                        />
                    </Form.Field>
                    <button
                        className="ui primary button"
                        onClick={this.handleSave}>
                        {(this.state.isSaving)
                            ? <LoaderTiny/>
                            : "Save"}
                    </button>
                </Form>
            </Fragment>
        );
    }
}

export default connect(UpdateHomepageBanner.mapStateToProps)(UpdateHomepageBanner);