import React, {Component} from "react";
import {SocialMenu} from "../menus/SocialMenu";

class Footer extends Component {
    render(){
        let {
            children,
            ...props
        } = this.props;

        return (
            <footer {...props}>
                <SocialMenu/>
                {children}
            </footer>
        );
    }
}

export default Footer;