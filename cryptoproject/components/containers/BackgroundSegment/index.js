import React, {Component} from 'react';
import FullWidthSegment from '../FullWidthSegment';
import {joinClassNames} from "../../../services/utils";
import PropTypes from 'prop-types';

class BackgroundSegment extends Component {
    static options = FullWidthSegment.options;
    static defaultProps = Object.assign({}, FullWidthSegment.defaultProps, {
        options: [BackgroundSegment.options.halfHeight],
        style: {}
    });
    static propTypes = {
        imageUrl: PropTypes.string.isRequired
    };

    render(){
        const {
            imageUrl,
            wrapper,
            options,
            className,
            style,
            ...props
        } = this.props;

        const wrapperOpt = (wrapper === FullWidthSegment.defaultProps.wrapper) ? {} : {wrapper};

        return (
            <FullWidthSegment
                {...props}
                {...wrapperOpt}
                className={joinClassNames(options.join(' '), className)}
                style={Object.assign({}, {backgroundImage: `url('${imageUrl}')`}, style)}>
                {this.props.children}
            </FullWidthSegment>
        );
    }
}

export default BackgroundSegment;