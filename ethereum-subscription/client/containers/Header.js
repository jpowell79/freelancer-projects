import React, {Component} from 'react';
import MainMenu from '../modules/MainMenu';
import {notLoggedInMenu} from "../content";

class Header extends Component {
    render(){
        let {
            children,
            ...props
        } = this.props;

        return (
            <header {...props}>
                <MainMenu
                    links={notLoggedInMenu.links}
                    logo={notLoggedInMenu.logo}
                />
                {children}
            </header>
        );
    }
}

export default Header;