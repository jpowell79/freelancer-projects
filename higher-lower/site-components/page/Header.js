import React, {Component} from "react";
import MainMenu from "../menus/MainMenu";
import {Logo} from "../images/Logo";

class Header extends Component {
    render(){
        const {
            children,
            ...props
        } = this.props;

        return (
            <header {...props}>
                <Logo/>
                {children}
                <MainMenu/>
            </header>
        );
    }
}

export default Header;