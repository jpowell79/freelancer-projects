import axios from "axios/index";
import {urls, settings} from "../../../services/constants/index";

class SettingsUpdater {
    constructor(settingsState){
        this.settings = settingsState;
        const fileSettings = [
            settings.logo,
            settings.homepageBanner
        ];

        Object.keys(settings).forEach((key) => {
            if(fileSettings.includes(key)){
                this[key] = async (file) => {
                    const formData = new FormData();
                    formData.append('file', file, file.name);

                    return axios.post(urls.upload, formData)
                        .then(() => this.updateSetting({
                            name: settings[key],
                            value: file.name
                        }));
                }
            } else if(!this[key]){
                this[key] = async (value) => {
                    return this.updateSetting({
                        name: settings[key],
                        value
                    });
                }
            }
        })
    }

    updateSetting = async (data) => {
        return axios.post(urls.settings, Object.assign({}, data, {
            update: true
        }));
    };
}

export default SettingsUpdater;