import React, {Component} from 'react';
import MainMenu from '../../navigation/MainMenu';

class Header extends Component {
    render(){
        return (
            <header {...this.props}>
                <MainMenu/>
                {this.props.children}
            </header>
        );
    }
}

export default Header;