import axios from "axios/index";
import urls from "../../services/constants/urls";

class SettingsUpdater {
    constructor(settings){
        this.settings = settings;
    }

    updateSetting = async (data) => {
        return axios.post(urls.settings, Object.assign({}, data, {
            update: true
        }));
    };

    updateHomepageBannerImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file, file.name);

        return axios.post(urls.upload, formData)
            .then(() => this.updateSetting({
                name: this.settings.homepageBanner.name,
                value: file.name
            }));
    };

    updateHomepageBannerOverlayColor = async (color) => {
        return this.updateSetting({
            name: this.settings.homepageBannerOverlayColor.name,
            value: color
        });
    };

    updateHomepageBannerText = async (text) => {
        return this.updateSetting({
            name: this.settings.homepageBannerText.name,
            value: text
        });
    };

    updateHomepageBannerTitle = async (title) => {
        return this.updateSetting({
            name: this.settings.homepageBannerTitle.name,
            value: title
        });
    };
}

export default SettingsUpdater;