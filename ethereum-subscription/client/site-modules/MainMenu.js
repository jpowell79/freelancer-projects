import React, {Component, Fragment} from 'react';
import Link from 'next/link';
import {withRouter} from 'next/router';
import {MobileMenuIcon} from "../modules/icons";
import $ from 'jquery';
import {paths, urls, roles} from '../../services/constants';
import {connect} from 'react-redux';
import axios from 'axios';
import {hideOnMobile} from "../services/css";
import {classNames, spreadClassName} from "../services/className";

class MainMenu extends Component {
    static mapStateToProps = ({user}) => ({user});

    static defaultProps = {
        className: ""
    };

    static items = {
        logo: {
            src: `${paths.static.images}/logo_small.png`,
            href: paths.pages.index
        },
        links: [
            {
                name: 'Register',
                href: paths.pages.register
            },
            {
                name: 'Login',
                href: paths.pages.login
            },
            {
                name: 'How it works',
                href: paths.pages.howItWorks
            },
            {
                name: 'About',
                href: paths.pages.about
            },
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

        this.$mainMenuToggler.on('click', () =>{
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

    renderMainMenu = () =>{
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
                        links.map((link, i) =>{
                            if(link.href === ''){
                                return (
                                    <a key={i}>{link.name}</a>
                                );
                            }

                            return (
                                <Link key={i} href={link.href}>
                                    <a className={"item" + this.getActiveClass(link.href)}>
                                        {link.name}
                                    </a>
                                </Link>
                            );
                        })
                    }
                </nav>
            </Fragment>
        );
    };

    renderSupplierMenu = () => {
        const {user} = this.props;
        const {logo} = MainMenu.items;

        return (
            <Fragment>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    <div className={hideOnMobile('item')}>
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                    <div className="item">
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() =>{
                                axios.delete(urls.sessions)
                                    .then(() =>{
                                        paths.redirect(paths.pages.login);
                                    });
                            }}>Logout</button>
                    </div>
                </nav>
            </Fragment>
        );
    };

    renderAdminMenu = () =>{
        const {user} = this.props;
        const {logo} = MainMenu.items;

        return (
            <Fragment>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    <div className={hideOnMobile('item')}>
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                    <Link href={paths.pages.admin}>
                        <a className={"item" + this.getActiveClass(paths.pages.admin)}>
                            Admin
                        </a>
                    </Link>
                    <Link href={paths.pages.supplier}>
                        <a className={"item" + this.getActiveClass(paths.pages.supplier)}>
                            Supplier
                        </a>
                    </Link>
                    <div className="item">
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() =>{
                                axios.delete(urls.sessions)
                                     .then(() =>{
                                         paths.redirect(paths.pages.login);
                                     });
                            }}>Logout</button>
                    </div>
                </nav>
            </Fragment>
        );
    };

    renderMenu = (route, user) => {
        switch(route){
        case paths.pages.admin:
            return this.renderAdminMenu();
        case paths.pages.supplier:
            return (user.role === roles.admin)
                ? this.renderAdminMenu()
                : this.renderSupplierMenu();
        default:
            return this.renderMainMenu();
        }
    };

    render(){
        const {
            dispatch,
            router,
            user,
            className,
            ...props
        } = this.props;

        //TODO: Render Menu Based on Location
        const mainMenuClass = classNames({
            'no-mobile': (
                router.route === paths.pages.admin || router.route === paths.pages.supplier
            )
        }, className);

        return (
            <nav id="main-menu" {...spreadClassName(mainMenuClass)} {...props}>
                {this.renderMenu(router.route, user)}
                <div id="main-menu-toggler">
                    <MobileMenuIcon/>
                </div>
            </nav>
        );
    }
}

export default withRouter(connect(MainMenu.mapStateToProps)(MainMenu));