import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import {withRouter} from 'next/router';
import {MobileMenuIcon} from "../modules/icons";
import $ from 'jquery';
import paths, {redirect} from "../../services/paths";
import {connect} from 'react-redux';
import {isEmpty} from '../../services/objects';
import axios from 'axios';
import urls from '../../services/urls';

class MainMenu extends Component {
    static mapStateToProps = ({user}) => ({user});

    static items = {
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

    constructor(props){
        super(props);

        this.getActiveClass = this.getActiveClass.bind(this);
    }

    componentDidMount(){
        this.$mainMenuToggler = $('#main-menu-toggler');
        const $mobileMenuIcon = $('.mobile-menu-icon');
        const $mainMenu = $('#main-menu');

        this.$mainMenuToggler.on('click', () => {
            $mainMenu.toggleClass('reveal-items');
            $mainMenu.addClass('animate');
            this.$mainMenuToggler.toggleClass('active');
            $mobileMenuIcon.toggleClass('open');
        });
    }

    componentWillUnmount(){
        this.$mainMenuToggler.off('click');
        $('body').removeClass('mobile-menu-open');
    }

    getActiveClass(page){
        return (this.props.router.route === page) ? " active" : "";
    }

    renderNotLoggedInMenu = () => {
        const {
            logo,
            links
        } = MainMenu.items;

        return (
            <Fragment>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    {
                        links.map((link, i) => {
                            if(link.href === ''){
                                return (
                                    <a key={i}>{link.type}</a>
                                );
                            }

                            return (
                                <Link key={i} href={link.href}>
                                    <a className={"item" + this.getActiveClass(link.href)}>
                                        {link.type}
                                    </a>
                                </Link>
                            );
                        })
                    }
                </nav>
            </Fragment>
        );
    };

    renderLoggedInMenu = () => {
        const {user} = this.props;
        const {logo} = MainMenu.items;

        return (
            <Fragment>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    <div className="item">
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                    <div className="item">
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() => {
                                axios.delete(urls.sessions)
                                    .then(() => {
                                        redirect(paths.pages.login)
                                    });
                            }}>Logout</button>
                    </div>
                </nav>
            </Fragment>
        );
    };

    render(){
        const {
            dispatch,
            router,
            user,
            ...props
        } = this.props;

        //TODO: Render Menu Based on Location

        return (
            <nav id="main-menu" {...props}>
                {isEmpty(user) ? this.renderNotLoggedInMenu() : this.renderLoggedInMenu()}
                <div id="main-menu-toggler">
                    <MobileMenuIcon/>
                </div>
            </nav>
        );
    }
}

export default withRouter(connect(MainMenu.mapStateToProps)(MainMenu));