import React, {Component, Fragment} from "react";
import Link from "next/link";
import {withRouter} from "next/router";
import {MobileMenuIcon} from "../modules/icons";
import $ from "jquery";
import {paths, roles} from "../../services/constants";
import {connect} from "react-redux";
import {hideOnMobile} from "../services/constants/css";
import sessions from "../../services/api/sessions";
import objects from "../../services/datatypes/objects";

class MainMenu extends Component {
    static mapStateToProps = ({user, settings}) => ({user, settings});

    static items = {
        links: [
            {
                name: "Register",
                href: paths.pages.register
            },
            {
                name: "Login",
                href: paths.pages.login
            },
            {
                name: "How it works",
                href: paths.pages.howItWorks
            },
            {
                name: "About",
                href: paths.pages.about
            },
        ]
    };

    constructor(props){
        super(props);

        this.getActiveClass = this.getActiveClass.bind(this);
    }

    componentDidMount(){
        this.$mainMenuToggler = $("#main-menu-toggler");
        const $mobileMenuIcon = $(".mobile-menu-icon");
        const $mainMenu = $("#main-menu");

        this.$mainMenuToggler.on("click", () =>{
            $mainMenu.toggleClass("reveal-items");
            $mainMenu.addClass("animate");
            this.$mainMenuToggler.toggleClass("active");
            $mobileMenuIcon.toggleClass("open");
        });
    }

    componentWillUnmount(){
        this.$mainMenuToggler.off("click");
        $("body").removeClass("mobile-menu-open");
    }

    getActiveClass(page){
        return (this.props.router.route === page) ? " active" : "";
    }

    renderMainMenu = (user) =>{
        const {links} = MainMenu.items;

        const parsedLinks = (objects.isEmpty(user)) ? links : [
            {
                content: (
                    <div className={hideOnMobile("item")} key="welcome-message">
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                )
            },
            {
                name: "Control Panel",
                href: (user.role === roles.admin) ? paths.pages.admin : paths.pages.supplier
            },
            ...links.filter(link => link.name !== "Register" && link.name !== "Login")
        ];

        return (
            <Fragment>
                <Link href="/">
                    <a><img src={`${paths.static.images}/${this.props.settings.logo.value}`}/></a>
                </Link>
                <nav>
                    {
                        parsedLinks.map((link, i) =>{
                            if(link.content){
                                return link.content;
                            } else if(link.href === ""){
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

        return (
            <Fragment>
                <Link href="/">
                    <a><img src={`${paths.static.images}/${this.props.settings.logo.value}`}/></a>
                </Link>
                <nav>
                    <div className={hideOnMobile("item")}>
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                    <div className="item">
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() =>{
                                sessions.logout().then(() =>{
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

        return (
            <Fragment>
                <Link href="/">
                    <a><img src={`${paths.static.images}/${this.props.settings.logo.value}`}/></a>
                </Link>
                <nav>
                    <div className={hideOnMobile("item")}>
                        <span>Welcome back <strong>{user.username}</strong></span>
                    </div>
                    <Link href={paths.pages.admin}>
                        <a className={"item" + this.getActiveClass(paths.pages.admin)}>
                            Admin
                        </a>
                    </Link>
                    <div className="item">
                        <button
                            className="ui bg-color-uiBlue color-white button"
                            onClick={() =>{
                                sessions.logout().then(() =>{
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
            return this.renderMainMenu(user);
        }
    };

    render(){
        const {
            dispatch,
            router,
            user,
            settings,
            ...props
        } = this.props;

        return (
            <nav id="main-menu" {...props}>
                {this.renderMenu(router.route, user)}
                <div id="main-menu-toggler">
                    <MobileMenuIcon/>
                </div>
            </nav>
        );
    }
}

export default withRouter(connect(MainMenu.mapStateToProps)(MainMenu));