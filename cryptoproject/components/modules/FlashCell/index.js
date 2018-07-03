import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {joinClassNames} from "../../../services/utils";
import {defaultComparator} from "../../../services/utils";

class FlashCell extends Component {
    static defaultProps = {
        initialCompare: (compare) => {
            return compare;
        },
        shouldCellAnimate: (compare, isInitialCompare) => {
            return compare !== 0 && !isInitialCompare;
        },
        comparator: defaultComparator
    };

    static propTypes = {
        shouldCellAnimate: PropTypes.func,
        initialCompare: PropTypes.func,
        value: PropTypes.number.isRequired,
        prevValue: PropTypes.number.isRequired,
        comparator: PropTypes.func
    };

    constructor(props){
        super(props);

        this.currentCompare = null;
        this.changedClass = '';
    }

    render(){
        const {
            shouldCellAnimate,
            initialCompare,
            value,
            prevValue,
            comparator,
            children,
            className,
            ...props
        } = this.props;

        let isInitialCompare = false;

        if(this.currentCompare === null){
            this.currentCompare = initialCompare(
                comparator(value, prevValue)
            );
            isInitialCompare = true;
        } else {
            this.currentCompare = comparator(value, prevValue);
        }

        const animate = shouldCellAnimate(this.currentCompare, isInitialCompare) ? 'animate' : '';

        if(this.currentCompare === 1){
            this.changedClass = 'flash-cell--green';
        } else if(this.currentCompare === -1){
            this.changedClass = 'flash-cell--red';
        }

        return (
            <span {...props} className={joinClassNames(
                joinClassNames(this.changedClass, animate),
                className
            )}>{children}</span>
        );
    }
}

export default FlashCell;