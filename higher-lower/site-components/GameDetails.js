import React, {Fragment} from "react";
import {Address} from "./Address";
import HideFragment from "../components/containers/HideFragment";
import Counter from "../external-components/react-flip-counter";

export const GameDetails = ({
    nextGuess,
    lowValue,
    highValue,
    metamaskAddress,
    costOfNextGuess,
    lastGuessAddress,
    counterIsStopped,
    onCounterStop = () => {},
    gameEndTime,
    balance
}) => {
    return (
        <Fragment>
            <h3>
                The correct number is between {lowValue} and {highValue}
            </h3>
            <h3>
                The next guess will be guess {nextGuess} <p>
                cost of next guess: {
                (costOfNextGuess === 0)
                    ? "FREE!"
                    : `${costOfNextGuess} Eth`
            }
            </p>
            </h3>
            <h3>
                The last Ethereum wallet address to make a guess was: <p>
                {(lastGuessAddress === "0x0000000000000000000000000000000000000000")
                    ? (
                        <span>Nobody has made a guess yet!</span>
                    ) : (metamaskAddress === lastGuessAddress) ? (
                        <span>You, my friend!</span>
                    ) : (
                        <Address address={lastGuessAddress}/>
                    )}
            </p>
            </h3>
            <div className="divider-2">
                <HideFragment>
                    <Counter
                        isStopped={counterIsStopped}
                        onStop={onCounterStop}
                        stop={new Date(gameEndTime)}
                    />
                </HideFragment>
            </div>
            <h3>
                Eth currently stored in this contract: {balance}
            </h3>
            <h3>
                Remember, if you guess incorrectly, you will still win the Eth if the
                countdown timer reaches zero!
            </h3>
        </Fragment>
    );
};