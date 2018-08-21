import React, {Component} from 'react';
import {classNames} from "../services/className";
import PropTypes from 'prop-types';
import objects from '../../services/objects';

class Animation extends Component {
    static status = {
        IN: "IN",
        OUT: "OUT",
        IDLE: "IDLE"
    };

    static defaultProps = {
        animation: 'fade',
        animating: true,
        visible: true,
        status: Animation.status.IDLE,
        duration: 400,
        className: "",
        style: {}
    };

    static propTypes = {
        animation: PropTypes.oneOf([
            'browse', 'browse right', 'drop', 'fade', 'fade up', 'fade down', 'fade left',
            'fade right', 'fly up', 'fly down', 'fly left', 'fly right', 'horizontal flip',
            'vertical flip', 'scale', 'slide up', 'slide down', 'slide left', 'slide right',
            'swing up', 'swing down', 'swing left', 'swing right', 'zoom', 'jiggle',
            'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'
        ]),
        status: PropTypes.oneOf(objects.values(Animation.status)),
        animating: PropTypes.bool,
        visible: PropTypes.bool,
        duration: PropTypes.number
    };

    render(){
        const {
            animation,
            animating,
            status,
            visible,
            children,
            duration,
            className,
            style,
            ...props
        } = this.props;

        const animationClass = classNames({
            'ui transition': true,
            [animation]: animating,
            'animating': animating,
            'visible': visible,
            'hidden': !visible,
            'in': status === Animation.status.IN,
            'out': status === Animation.status.OUT
        }, className);
        const animationStyle = Object.assign({}, {animationDuration: `${duration}ms`}, style);

        return (
            <div
                {...props}
                className={animationClass}
                style={animationStyle}
            >{children}</div>
        );
    }
}

export default Animation;