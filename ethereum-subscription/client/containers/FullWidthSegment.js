import React, {Component} from 'react';
import {fullWidthSegment} from "../services/constants/css";
import {joinClassNames, classNames} from "../services/className";

class FullWidthSegment extends Component {
    static defaultProps = {
        className: '',
        wrapper: -1,
        halfHeight: false,
        fullHeight: false,
        padded: false,
        skinny: false,
        bordered: false,
        attached: false,
        centered: false,
        inverted: false,
        paddingLess: false,
        noWidthPadding: false,
        noHeightPadding: false,
    };

    render(){
        const {
            wrapper,
            className,
            halfHeight,
            fullHeight,
            padded,
            skinny,
            bordered,
            attached,
            centered,
            inverted,
            paddingLess,
            noWidthPadding,
            noHeightPadding,
            ...props
        } = this.props;

        const segmentClass = classNames({
            'half height': halfHeight,
            'height': fullHeight,
            'padded': padded,
            'skinny': skinny,
            'bordered': bordered,
            'attached': attached,
            'centered': centered,
            'inverted': inverted,
            'paddingless': paddingLess,
            'widthless': noWidthPadding,
            'heightless': noHeightPadding
        }, className);

        return (
            <section {...props} className={joinClassNames(
                fullWidthSegment(),
                segmentClass
            )}>
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