import React, {Component} from 'react';
import MainMenu from '../site-modules/MainMenu';
import {notLoggedInMenu} from "../clientSettings";

class Header extends Component {
    render(){
        const {
            children,
            ...props
        } = this.props;

        return (
            <header {...props}>
                <MainMenu/>
                {children}
            </header>
        );
    }
}

export default Header;