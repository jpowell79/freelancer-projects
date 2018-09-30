import React, {Component} from "react";
import MainMenu from "../MainMenu";
import {Space} from "../../components/Space";
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
                <Space/>
            </header>
        );
    }
}

export default Header;