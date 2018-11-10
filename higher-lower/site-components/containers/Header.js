import React, {Component} from "react";
import MainMenu from "../MainMenu";
import {Logo} from "../Logo";

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