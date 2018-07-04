import {ListMenu} from "./modules/navigation/ListMenu";
import {SocialMenu} from "./modules/navigation/SocialMenu";
import {
    Telegram,
    Twitter,
    Github,
    Reddit,
    Medium
} from "./modules/icons/index";
import Paths from "../services/Paths";

/*----------------------------------------
 * Main Menu
 *----------------------------------------*/
export const MAIN_MENU = {
    logo: {
        src: Paths.getImage('logo', 'small'),
        href: '/'
    },
    links: [
        {
            name: 'Trade',
            href: Paths.getTradingPage()
        },
        {
            name: 'How it Works',
            href: ''
        },
        {
            name: 'The Team',
            href: Paths.getTheTeamPage()
        },
        {
            name: 'Smart Contracts',
            href: Paths.getSmartContractsPage()
        },
        {
            name: 'Historic Data',
            href: Paths.getHistoricDataPage()
        },
        {
            name: 'Dividend Fund',
            href: Paths.getDividendFundPage()
        },
        {
            name: 'Contact',
            href: ''
        }
    ]
};

/*----------------------------------------
 * Social Menu
 *----------------------------------------*/
export const SOCIAL_MENU = {
    title: 'Social Media', //Optional
    links: [
        {
            icon: <Github/>,
            href: 'https://github.com'
        },
        {
            icon: <Twitter/>,
            href: 'https://twitter.com'
        },
        {
            icon: <Reddit/>,
            href: 'https://reddit.com'
        },
        {
            icon: <Telegram/>,
            href: 'https://telegram.org'
        },
        {
            icon: <Medium/>,
            href: 'https://medium.com'
        }
    ]
};

/*----------------------------------------
 * Footer Menus
 *----------------------------------------*/
export const FOOTER_MENU_1 = {
    title: 'Software', //Optional
    links: [
        {
            name: 'Horizon API',
            href: ''
        },
        {
            name: 'Tools',
            href: ''
        },
        {
            name: 'Libraries',
            href: ''
        },
        {
            name: 'Documentation',
            href: ''
        }
    ]
};

export const FOOTER_MENU_2 = {
    title: 'Community', //Optional
    links: [
        {
            name: 'Community',
            href: ''
        },
        {
            name: 'Blog',
            href: ''
        },
        {
            name: 'Support',
            href: ''
        },
        {
            name: 'Bug Bounty Program',
            href: ''
        },
        {
            name: 'Contact',
            href: ''
        }
    ]
};

export const FOOTER_MENU_3 = {
    title: 'About', //Optional
    links: [
        {
            name: 'Mandate',
            href: ''
        },
        {
            name: 'Team',
            href: ''
        },
        {
            name: 'Partners Directory',
            href: ''
        },
        {
            name: 'Jobs',
            href: ''
        },
        {
            name: 'Press',
            href: ''
        }
    ]
};

/*----------------------------------------
 * Footer Columns
 *----------------------------------------*/
export const FOOTER_COLUMNS = [
    <ListMenu
        title={FOOTER_MENU_1.title}
        links={FOOTER_MENU_1.links}
        className="inverted"/>,
    <ListMenu
        title={FOOTER_MENU_2.title}
        links={FOOTER_MENU_2.links}
        className="inverted"/>,
    <ListMenu
        title={FOOTER_MENU_3.title}
        links={FOOTER_MENU_3.links}
        className="inverted"/>,
    <SocialMenu
        title={SOCIAL_MENU.title}
        links={SOCIAL_MENU.links}
        titleClass="inverted"
        className="justify-content-center"/>
];

/*----------------------------------------
 * FAQ
 *----------------------------------------*/
export const FAQ = [
    {
        question: 'Delectus modi ratione omnis odit harum et sit?',
        answer: (
            <p>
                Commodi quibusdam voluptas quidem aut corrupti aspernatur debitis ut
                ratione.
            </p>
        )
    },
    {
        question: 'Quae eius voluptatibus repellendus totam?',
        answer: (
            <p>
                Vero minima quis itaque praesentium sed assumenda. Voluptatem sed enim
                Eos et omnis quaerat aliquid eum commodi dicta ipsum quam. Reprehenderit
                esse enim ea et quia quidem est autem. Vero dignissimos quo nostrum qui
                laboriosam quisquam dolores sit.
            </p>
        )
    },
    {
        question: 'Repellat a dolores unde repudiandae odio vel autem qui laboriosam?',
        answer: (
            <div>
                <span>Optio aspernatur velit consectetur commodi aut et et.</span>
                <ol>
                    <li>Aspernatur</li>
                    <li>Dignissimos</li>
                    <li>Optio</li>
                </ol>
            </div>
        )
    },
    {
        question: 'Sunt laborum quasi esse corporis est?',
        answer: (
            <p>
                Eveniet mollitia omnis sapiente minima. Corrupti dignissimos provident
                molestiae accusantium ut expedita quod cupiditate maxime.
            </p>
        )
    },
];