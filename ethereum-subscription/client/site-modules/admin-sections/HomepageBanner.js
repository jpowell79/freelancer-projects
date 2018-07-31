import React, {Component, Fragment} from 'react';
import {Form, Message} from 'semantic-ui-react';
import FileInput from '../../modules/FileInput';
import {connect} from 'react-redux';
import ColorPicker from '../../modules/ColorPicker';
import AlertOptionPane from "../../services/Alert/AlertOptionPane";
import {LoaderTiny} from "../../modules/icons";
import SettingsUpdater from '../../services/SettingsUpdater';

class HomepageBanner extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    constructor(props){
        super(props);

        this.state = {
            file: {name: props.settings.homepageBanner.value},
            color: props.settings.homepageBannerOverlayColor.value,
            text: props.settings.homepageBannerText.value,
            title: props.settings.homepageBannerTitle.value,
            isSaving: false,
            hasSaved: false,
        };

        this.settingsUpdater = new SettingsUpdater(props.settings);
    }

    handleSave = () => {
        const {file, color, text, title} = this.state;
        this.setState({isSaving: true});
        const uploadPromise = (file.type)
            ? this.settingsUpdater.updateHomepageBannerImage(file) : () => {};

        return Promise.all([
            this.settingsUpdater.updateHomepageBannerOverlayColor(color),
            this.settingsUpdater.updateHomepageBannerText(text),
            this.settingsUpdater.updateHomepageBannerTitle(title),
            uploadPromise,
        ]).then(() => {
            this.setState({
                hasSaved: true,
                isSaving: false
            });
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
            this.setState({isSaving: false});
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
                <h2>Homepage Banner</h2>
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
                    <Form.Field>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={(event) => {
                                this.setState({title: event.target.value});
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Text:</label>
                        <textarea
                            value={this.state.text}
                            onChange={(event) => {
                                this.setState({text: event.target.value});
                            }}
                            rows={5}
                        />
                    </Form.Field>
                    <div className="divider-1"/>
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

export default connect(HomepageBanner.mapStateToProps)(HomepageBanner);