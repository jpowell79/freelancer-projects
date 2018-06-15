import React, {Component} from 'react';
import {SocialMenu} from "../navigation/SocialMenu";

class Footer extends Component {
    render() {
        return (
            <div id="site-footer" className="ui bg-color-light-gray segment">
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
            </div>
        );
    }
}

export default Footer;