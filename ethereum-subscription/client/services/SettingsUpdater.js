import axios from "axios/index";
import urls from "../../services/urls";

class SettingsUpdater {
    constructor(settings){
        this.settings = settings;
    }

    updateSetting = async (data) => {
        return axios.post(urls.settings, Object.assign({}, data, {
            update: true
        }));
    };

    updateHomepageBannerImage = async (imageName) => {
        return this.updateSetting({
            name: this.settings.homepageBanner.name,
            value: imageName
        });
    };

    updateHomepageBannerOverlayColor = async (color) => {
        return this.updateSetting({
            name: this.settings.homepageBannerOverlayColor.name,
            value: color
        });
    }
}

export default SettingsUpdater;