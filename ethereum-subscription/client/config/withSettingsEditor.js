import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import SettingsUpdater from "../services/SettingsUpdater";
import {LoaderTiny} from "../modules/icons";
import {Message} from 'semantic-ui-react';
import AlertOptionPane from "../services/Alert/AlertOptionPane";
import objects from '../../services/objects';

export default (PageComponent, title) => {
    class SettingsEditor extends Component {
        static mapStateToProps = ({settings}) => ({settings});

        constructor(props){
            super(props);

            this.state = {
                isSaving: false,
                hasSaved: false,
            };

            this.settingsUpdater = new SettingsUpdater(props.settings);
            console.log(this.settingsUpdater);
        }

        handleSave = () => {
            this.setState({isSaving: true});
            const componentState = objects.filter(this.component.state, setting => setting);

            return Promise.all(Object
                .keys(componentState)
                .map(settingsKey =>
                    this.settingsUpdater[settingsKey](componentState[settingsKey].value)
                ))
                .then(() => {
                    this.setState({
                        hasSaved: true,
                        isSaving: false
                    });
                })
                .catch(err => {
                    AlertOptionPane.showErrorAlert({message: err.toString()});
                    this.setState({isSaving: false});
                });
        };

        getDefaultsOrState = (state) => {
            return objects.map(state, (setting, settingKey) =>
                (setting) ? setting : this.props.settings[settingKey]
            );
        };

        render() {
            return (
                <Fragment>
                    {(this.state.hasSaved) && (
                        <Message
                            success
                            header='Your changes have been saved successfully!'
                        />
                    )}
                    <h2>{title}</h2>
                    <div className="divider-3">
                        <PageComponent
                            {...this.props}
                            settingsUpdater={this.settingsUpdater}
                            getDefaultsOrState={this.getDefaultsOrState}
                            ref={component => {this.component = component}}
                        />
                    </div>
                    <button
                        className="ui primary button"
                        onClick={this.handleSave}>
                        {(this.state.isSaving)
                            ? <LoaderTiny/>
                            : "Save"}
                    </button>
                </Fragment>
            );
        }
    }

    return connect(SettingsEditor.mapStateToProps)(SettingsEditor);
}