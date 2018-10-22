import React, {Component, Fragment} from "react";
import PositiveIntegerInput from "../components/PositiveIntegerInput";
import {LoaderTiny} from "../components/icons";
import PropTypes from "prop-types";
import {Message} from "../components/containers/Message";

class GuessForm extends Component {
    static propTypes = {
        defaultGuess: PropTypes.string.isRequired,
        lowValue: PropTypes.number.isRequired,
        highValue: PropTypes.number.isRequired,
        onGuess: PropTypes.func.isRequired
    };

    static getDerivedStateFromProps(props, state){
        if(props.defaultGuess !== state.defaultGuess){
            return {
                ...state,
                guess: props.defaultGuess,
                defaultGuess: props.defaultGuess
            }
        }

        return null;
    }

    constructor(props){
        super();

        this.state = {
            formValid: true,
            isHandlingGuess: false,
            guess: props.defaultGuess,
            defaultGuess: props.defaultGuess
        };
    }

    renderMessage = () => {
        const {lowValue, highValue} = this.props;

        const props = (this.state.isHandlingGuess) ? {
            className: "message-info text-left",
            heading: "Waiting for transaction confirmation",
            list: [
                "Please allow up to 30 seconds for the transaction to " +
                "be processed and written to the Ethereum blockchain."
            ]
        } : {};

        return (
            <Message
                show={this.state.formInvalid || this.state.isHandlingGuess}
                className="message-secondary"
                {...props}
            >
                {(this.state.formInvalid && !this.state.isHandlingGuess) && (
                    <p className="normal">
                        The guess must be between {lowValue} and {highValue}
                    </p>
                )}
            </Message>
        );
    };

    handleGuess = () => {
        const {
            lowValue,
            highValue
        } = this.props;

        const guess = parseFloat(this.state.guess);

        if(guess < lowValue || guess > highValue || this.state.guess === ""){
            this.setState({
                formInvalid: true,
                isHandlingGuess: false
            });
        } else {
            return this.props.onGuess(this.state.guess)
                .then(() => this.setState({isHandlingGuess: false}));
        }
    };


    render(){
        const {
            lowValue,
            highValue
        } = this.props;

        return (
            <Fragment>
                <div className="input-with-button divider-2">
                    <PositiveIntegerInput
                        className={(this.state.formInvalid) ? "invalid" : ""}
                        lowestDigit={lowValue}
                        highestDigit={highValue}
                        disabled={this.state.isHandlingGuess}
                        value={this.state.guess}
                        onIncorrectInput={() => {
                            this.setState({formInvalid: true})
                        }}
                        onCorrectInput={(event) => {
                            this.setState({
                                formInvalid: false,
                                guess: event.target.value
                            });
                        }}
                    />
                    <button
                        className="button-secondary"
                        onClick={() => {
                            this.setState({isHandlingGuess: true}, () => {
                                this.handleGuess();
                            });
                        }}
                        disabled={this.state.isHandlingGuess}
                    >{(this.state.isHandlingGuess) ? <LoaderTiny/> : "Guess"}</button>
                </div>
                <div className="wrapper-4">
                    {this.renderMessage()}
                </div>
            </Fragment>
        );
    }
}

export default GuessForm;