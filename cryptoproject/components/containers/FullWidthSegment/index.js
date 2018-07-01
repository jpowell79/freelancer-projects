import React, {Component} from 'react';
import {
    fullWidthSegment,
    COLORS
} from "../../../services/cssUtils";
import {joinClassNames} from "../../../services/utils";

class FullWidthSegment extends Component {
    static defaultProps = {
        options: [],
        className: '',
        wrapper: -1
    };

    static options = {
        halfHeight: 'half height',
        fullHeight: 'height',
        padded: 'padded',
        skinny: 'skinny',
        bordered: 'bordered',
        attached: 'attached',
        centered: 'centered',
        inverted: 'inverted',
        paddingLess: 'paddingless',
        noWidthPadding: 'widthless',
        noHeightPadding: 'heightless',
        colors: COLORS
    };

    render(){
        const {
            wrapper,
            options,
            className,
            ...props
        } = this.props;

        return (
            <section {...props} className={joinClassNames(
                fullWidthSegment(options.join(' ')),
                className)
            }>
                {(wrapper > 0)
                    ? (
                        <div className={`wrapper-${wrapper}`}>
                            {this.props.children}
                        </div>
                    ) : this.props.children}
            </section>
        );
    }
}

export default FullWidthSegment;