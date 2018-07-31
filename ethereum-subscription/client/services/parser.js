import escape from 'html-escape';

export const parseSettings = (settings) => {
    return Object.assign({}, settings, {
        homepageBannerText: {
            ...settings.homepageBannerText,
            value: escape(settings.homepageBannerText.value)
        },
        hompageBannerTitle: {
            ...settings.homepageBannerTitle,
            value: escape(settings.homepageBannerTitle.value)
        }
    });
};

export default {
    parseSettings
};