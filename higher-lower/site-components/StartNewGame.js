import React from "react";
import {Message} from "../components/containers/Message";
import {Address} from "./Address";

export const StartNewGame = ({gameWinner, metamaskAddress, onClick}) =>{
    const startNewGameButton = (title) =>{
        return (
            <button
                className="button-primary"
                onClick={onClick}
            >{title}</button>
        );
    };

    return (gameWinner === metamaskAddress) ? (
        <div className="wrapper-4">
            <Message
                className="message-success mb-20"
                heading="Contratulations!"
            >
                <p>You won the game, click on the Claim Prize button to collect your Eth!</p>
            </Message>
            {startNewGameButton("Claim Prize")}
        </div>
    ) : (
        <div>
            <h3>The game has now completed</h3>
            <h4>Wallet address <Address address={gameWinner}/> was the winner!</h4>
            <h4>Click the New Game button to launch a completely new game!</h4>
            {startNewGameButton("New Game")}
        </div>
    );
};