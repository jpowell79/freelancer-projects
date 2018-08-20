import React, {Component} from 'react';
import {joinClassNames, classNames} from "../services/className";
import {sleep} from '../../services/utils';
import PropTypes from 'prop-types';
import {childrenToArray} from "../services/utils";

class Slideshow extends Component {
    static animationStatus = {
        IN: "IN",
        OUT: "OUT",
        IDLE: "IDLE"
    };

    static defaultProps = {
        className: "",
        leftIcon: <i className="angle left icon"/>,
        rightIcon: <i className="angle right icon"/>,
        animation: "fade",
        duration: 400,
        onStateChange: () => {},
        stateReducer: (state, changes) => changes
    };

    static propTypes = {
        onStateChange: PropTypes.func,
        stateReducer: PropTypes.func,
        duration: PropTypes.number,
        animation: PropTypes.oneOf([
            'browse', 'browse right', 'drop', 'fade', 'fade up', 'fade down', 'fade left',
            'fade right', 'fly up', 'fly down', 'fly left', 'fly right', 'horizontal flip',
            'vertical flip', 'scale', 'slide up', 'slide down', 'slide left', 'slide right',
            'swing up', 'swing down', 'swing left', 'swing right', 'zoom', 'jiggle',
            'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow'
        ])
    };

    constructor(props){
        super(props);

        this.state = {
            active: 0,
            animating: false,
            canChangeSlide: true,
            animationStatus: Slideshow.animationStatus.IDLE
        }
    }

    awaitAnimation = () => sleep(this.props.duration);

    internalSetState = (changes, callback = () => {}) => {
        let allChanges;

        this.setState(() => {
            allChanges = this.props.stateReducer(this.state, changes);
            return allChanges;
        }, () => {
            this.props.onStateChange(allChanges);
            callback(allChanges);
        });
    };

    setActiveState = (activeUpdater) => {
        this.internalSetState({
            canChangeSlide: false,
            animating: true,
            animationStatus: Slideshow.animationStatus.OUT
        }, () => {
            this.awaitAnimation().then(() => {
                this.internalSetState({
                    active: activeUpdater(this.state.active),
                    animationStatus: Slideshow.animationStatus.IN
                }, () => {
                    this.awaitAnimation().then(() => {
                        this.internalSetState({
                            canChangeSlide: true,
                            animating: false,
                            animationStatus: Slideshow.animationStatus.IDLE
                        });
                    });
                });
            });
        });
    };

    render(){
        const {
            children,
            leftIcon,
            rightIcon,
            animation,
            duration,
            className,
            onStateChange,
            stateReducer,
            ...props
        } = this.props;

        const childrenArray = childrenToArray(children);
        const rightIconClass = classNames({
            'unclickable': !this.state.canChangeSlide,
            'disabled': this.state.active === childrenArray.length-1 || !this.state.canChangeSlide,
            'hide-xxs': childrenArray.length <= 1
        }, rightIcon.props.className);
        const leftIconClass = classNames({
            'unclickable': !this.state.canChangeSlide,
            'disabled': this.state.active === 0 || !this.state.canChangeSlide,
            'hide-xxs': childrenArray.length <= 1
        }, leftIcon.props.className);

        return (
            <div className={joinClassNames("ui slideshow", className)} {...props}>
                {React.cloneElement(leftIcon, {
                    className: leftIconClass,
                    onClick: () => {
                        if(this.state.active-1 >= 0  && this.state.canChangeSlide){
                            this.setActiveState((prevActive) =>
                                ((prevActive-1 >= 0)
                                    ? prevActive-1
                                    : prevActive)
                            );
                        }
                    }
                })}
                {childrenArray.map((child, i) => {
                    const {IN, OUT} = Slideshow.animationStatus;

                    const slideClass = classNames({
                        'ui transition': true,
                        [animation]: this.state.animating && this.state.active === i,
                        'animating': this.state.animating && this.state.active === i,
                        'visible': this.state.active === i,
                        'hidden': this.state.active !== i,
                        'in': this.state.animationStatus === IN,
                        'out': this.state.animationStatus === OUT
                    });

                    return (
                        <div
                            className={slideClass}
                            style={{animationDuration: `${duration}ms`}}
                            key={i}
                        >{child}</div>
                    );
                })}
                {React.cloneElement(rightIcon, {
                    className: rightIconClass,
                    onClick: () => {
                        if(this.state.active < childrenArray.length-1 && this.state.canChangeSlide){
                            this.setActiveState((prevActive) =>
                                (prevActive+1 < childrenArray.length)
                                    ? prevActive+1
                                    : prevActive,
                            );
                        }
                    }
                })}
            </div>
        );
    }
}

export default Slideshow;