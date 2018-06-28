import React, {Component} from 'react';
import {SocialMenu} from "../../navigation/SocialMenu";
import {joinClassNames} from "../../../services/utils/index";

class Footer extends Component {
    render() {
        let {
            className,
            ...props
        } = this.props;

        return (
            <footer {...props} className={joinClassNames("ui bg-color-light-gray segment", className)}>
                <div className="ui padded stackable centered grid">
                    <div className="four wide column">
                        <div className="ui list">
                            <div className="item">
                                <h4 className="header">Software</h4>
                            </div>
                            <a className="item">Horizon API</a>
                            <a className="item">Tools</a>
                            <a className="item">Libraries</a>
                            <a className="item">Documentation</a>
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="ui list">
                            <div className="item">
                                <h4 className="header">Community</h4>
                            </div>
                            <a className="item">Community</a>
                            <a className="item">Blog</a>
                            <a className="item">Support</a>
                            <a className="item">Bug Bounty Program</a>
                            <a className="item">Contact</a>
                        </div>
                    </div>
                    <div className="four wide column">
                        <div className="ui list">
                            <div className="item">
                                <h4 className="header">About</h4>
                            </div>
                            <a className="item">Mandate</a>
                            <a className="item">Team</a>
                            <a className="item">Partners Directory</a>
                            <a className="item">Jobs</a>
                            <a className="item">Press</a>
                        </div>
                    </div>
                    <div className="four wide column">
                        <SocialMenu/>
                    </div>
                </div>
                {this.props.children}
            </footer>
        );
    }
}

export default Footer;