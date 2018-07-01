import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {filterObject} from "../../../services/utils/index";
import {joinClassNames} from "../../../services/utils/index";

class PositiveFloatInput extends Component {
    static defaultProps = {
        lowestDigit: 0,
        highestDigit: 0,
        value: '',
        defaultValue: '',
        className: '',
        onIncorrectInput: (event) => {
            event.preventDefault();
        },
        onCorrectInput: () => {}
    };

    static propTypes = {
        lowestDigit: PropTypes.number,
        highestDigit: PropTypes.number,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        className: PropTypes.string,
        onIncorrectInput: PropTypes.func,
        onCorrectInput: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.getValueToDisplay = this.getValueToDisplay.bind(this);
    }

    handleKeyDown(event) {
        if(event.target.value === '') {
            this.props.onCorrectInput(event);
            this.setState({value: event.target.value});
        } else if(!event.target.value.match(/^[\d.]*/g)){
            this.props.onIncorrectInput(event);
        } else if((event.target.value.match(/\./g) || []).length > 1){
            this.props.onIncorrectInput(event);
        } else if(event.target.value.startsWith('00')){
            this.props.onIncorrectInput(event);
        } else {
            let {lowestDigit, highestDigit} = this.props;
            let keyPressed = parseFloat(event.target.value);

            if(isNaN(keyPressed)){
                this.props.onIncorrectInput(event);
                return;
            }

            let cannotMatchLowYet = event.target.value.length < lowestDigit.toString().length;
            let isAboveOrEqualToLow = (keyPressed >= lowestDigit) || cannotMatchLowYet;
            let dontMatchHigh = highestDigit <= 0;
            let isBelowOrEqualToHigh = (keyPressed <= highestDigit || dontMatchHigh);
            let numberIsInRange = isAboveOrEqualToLow && isBelowOrEqualToHigh;

            if (!numberIsInRange){
                this.props.onIncorrectInput(event);
            } else {
                this.props.onCorrectInput(event);
                this.setState({value: event.target.value});
            }
        }
    }

    getValueToDisplay(){
        if(this.state.value !== undefined){
            return this.state.value;
        }

        return (this.props.defaultValue !== '0')
            ? this.props.defaultValue
            : this.props.value;
    }

    render() {
        return (
            <input
                {...filterObject(this.props, PositiveFloatInput.defaultProps)}
                type="text"
                className={joinClassNames("digit-input", this.props.className)}
                onChange={this.handleKeyDown}
                value={this.getValueToDisplay()}/>
        );
    }
}

export default PositiveFloatInput;