import React, {Component} from 'react';
import Link from 'next/link';
import {withRouter} from 'next/router';
import {MobileMenuIcon} from "./icons";
import $ from 'jquery';
import PropTypes from 'prop-types';

class MainMenu extends Component {
    static propTypes = {
        logo: PropTypes.object.isRequired,
        links: PropTypes.array.isRequired
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

    render(){
        const {
            logo,
            links,
            router,
            ...props
        } = this.props;

        return (
            <nav id="main-menu" {...props}>
                <Link href={logo.href}>
                    <a><img src={logo.src}/></a>
                </Link>
                <nav>
                    {links.map((link, i) => {
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