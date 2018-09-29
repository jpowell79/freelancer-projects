import React, {Component} from "react";

class Header extends Component {
    render(){
        const {
            children,
            ...props
        } = this.props;

        return (
            <header {...props}>
                {children}
            </header>
        );
    }
}

export default Header;