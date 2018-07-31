import React, {Component} from 'react';
import FullWidthSegment from './FullWidthSegment';
import PropTypes from 'prop-types';
import {classNames} from "../services/className";

class BackgroundSegment extends Component {
    static defaultProps = Object.assign({}, FullWidthSegment.defaultProps, {
        style: {}
    });
    static propTypes = {
        imageUrl: PropTypes.string.isRequired
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
            children,
            imageUrl,
            style,
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

        const wrapperOpt = (wrapper === FullWidthSegment.defaultProps.wrapper) ? {} : {wrapper};

        return (
            <FullWidthSegment
                {...props}
                {...wrapperOpt}
                className={segmentClass}
                style={Object.assign({}, {backgroundImage: `url('${imageUrl}')`}, style)}
            >
                {children}
            </FullWidthSegment>
        );
    }
}

export default BackgroundSegment;