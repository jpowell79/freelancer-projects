import React, {Component} from 'react';

class Footer extends Component {
    render(){
        let {
            children,
            ...props
        } = this.props;

        return (
            <footer {...props}>
                {children}
            </footer>
        );
    }
}

export default Footer;