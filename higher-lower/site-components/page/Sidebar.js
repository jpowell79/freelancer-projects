import React, {Component} from "react";

class Sidebar extends Component {
    render(){
        const {
            children,
            ...props
        } = this.props;

        return (
            <aside {...props}>
                {children}
            </aside>
        );
    }
}

export default Sidebar;