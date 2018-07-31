import axios from "axios/index";
import {urls, settings} from "../../services/constants/";

class SettingsUpdater {
    constructor(settingsState){
        this.settings = settingsState;

        Object.keys(settings).forEach((key) => {
            if(!this[key]){
                this[key] = (value) => {
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

    homepageBanner = async (file) => {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return axios.post(urls.upload, formData)
            .then(() => this.updateSetting({
                name: this.settings.homepageBanner.name,
                value: file.name
            }));
    };
}

export default SettingsUpdater;