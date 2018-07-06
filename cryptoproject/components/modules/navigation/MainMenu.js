import React, {Component} from 'react';
import Link from 'next/link';
import {withRouter} from 'next/router';
import {MobileMenuIcon} from "../icons/index";
import $ from 'jquery';
import {MAIN_MENU} from "../../content-settings";

class MainMenu extends Component {
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
    }

    getActiveClass(page){
        return (this.props.router.route === page) ? " active" : "";
    }

    render(){
        const {
            logo,
            links
        } = MAIN_MENU;

        return (
            <nav id="main-menu" {...this.props}>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    {links.map((link, i) => {
                        if(link.href === ''){
                            return (
                                <a key={i}>{link.name}</a>
                            );
                        }

                        const routerLink = link.href.replace(/\.\.\/\.\./g, '');

                        return (
                            <Link key={i} href={link.href}>
                                <a className={"item" + this.getActiveClass(routerLink)}>
                                    {link.name}
                                </a>
                            </Link>
                        );
                    })}
                </nav>
                <div id="main-menu-toggler">
                    <MobileMenuIcon/>
                </div>
            </nav>
        );
    }
}

export default withRouter(MainMenu);