import React, {Component} from 'react';
import FullWidthSegment from "../FullWidthSegment";
import {FOOTER_COLUMNS} from "../../content-settings";

class Footer extends Component {
    render() {
        const {
            ...props
        } = this.props;

        const {
            inverted,
            centered
        } = FullWidthSegment.options;

        return (
            <footer {...props}>
                <FullWidthSegment options={[inverted, centered]} wrapper={1}>
                    <div className="ui stackable inverted divided relaxed equal width grid">
                        <div className="row">
                            {FOOTER_COLUMNS.map((column, i) => {
                                return (
                                    <div key={i} className="column">
                                        {column}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </FullWidthSegment>
                {this.props.children}
            </footer>
        );
    }
}

export default Footer;