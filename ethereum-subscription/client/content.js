import paths from '../services/paths';

export const recaptchaSiteKey = '6LcVbGIUAAAAABiMl6EkPNsNUBVRC1U2l_VwR10Z';

export const notLoggedInMenu = {
    logo: {
        src: `${paths.static.images}/logo_small.png`,
        href: paths.pages.index
    },
    links: [
        {
            type: 'Register',
            href: paths.pages.register
        },
        {
            type: 'Login',
            href: paths.pages.login
        },
        {
            type: 'How it works',
            href: paths.pages.howItWorks
        },
        {
            type: 'About',
            href: paths.pages.about
        }
    ]
};