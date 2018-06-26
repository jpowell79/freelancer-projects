import React, {Component} from 'react';
import Paths from '../utils/Paths';
import Link from 'next/link';
import {withRouter} from 'next/router';
import {MobileMenuIcon} from "../icons";
import $ from 'jquery';

class MainMenu extends Component {
    constructor(props){
        super(props);

        this.getActiveClass = this.getActiveClass.bind(this);
    }

    componentDidMount(){
        this.$mainMenuToggler = $('#main-menu-toggler');
        let $mobileMenuIcon = $('.mobile-menu-icon');
        let $mainMenu = $('#main-menu');

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
        return (
            <nav id="main-menu" {...this.props}>
                <Link href="/"><a><img src={Paths.getImage('logo', 'small')}/></a></Link>
                <nav>
                    <a>Trade</a>
                    <a>How it Works</a>
                    <a>The Team</a>
                    <Link href={Paths.getHistoricDataPage()}>
                        <a className={"item" + this.getActiveClass("/HistoricData")}>Historic Data</a>
                    </Link>
                    <a>Contact</a>
                </nav>
                <div id="main-menu-toggler">
                    <MobileMenuIcon/>
                </div>
            </nav>
        );
    }
}

export default withRouter(MainMenu);