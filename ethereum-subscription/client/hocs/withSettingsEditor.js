import React, {Component, Fragment} from "react";
import {connect} from 'react-redux';
import SettingsUpdater from "../services/SettingsUpdater";
import {LoaderTiny} from "../modules/icons";
import {Message} from 'semantic-ui-react';
import AlertOptionPane from "../services/Alert/AlertOptionPane";
import objects from '../../services/objects';
import {loadServerDataIntoStoreFromClient} from "../services/loadServerDataIntoStore";
import {getChildProps} from "../services/utils";

export default (Module, title) => {
    class SettingsEditor extends Component {
        static async getInitialProps (appContext){
            const moduleProps = await getChildProps(Module, appContext);
            return {...moduleProps};
        }

        static mapStateToProps = ({settings}) => ({settings});

        constructor(props){
            super(props);

            this.state = {
                isSaving: false,
                hasSaved: false,
            };

            this.settingsUpdater = new SettingsUpdater(props.settings);
        }

        handleSave = () => {
            this.setState({
                isSaving: true,
                hasSaved: false
            });
            const componentState = objects.filter(this.component.state, setting => setting);

            return Promise.all(Object
                .keys(componentState)
                .map(settingsKey =>
                    this.settingsUpdater[settingsKey](componentState[settingsKey].value)
                ))
                .then(() =>
                    loadServerDataIntoStoreFromClient(this.props.dispatch, {settings: true})
                )
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
                    <Module
                        {...this.props}
                        settingsUpdater={this.settingsUpdater}
                        getDefaultsOrState={this.getDefaultsOrState}
                        ref={component => {this.component = component}}
                    />
                    <hr className="ui divider"/>
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