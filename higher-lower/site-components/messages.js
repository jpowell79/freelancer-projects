import React from "react";
import {Message} from "../components/containers/Message";
import settings from "../settings";

export const LoginMessage = () => {
    return (
        <Message
            className="message-secondary"
            heading="We were unable to detect your metamask account"
        >
            <p>Please login to metamask in order to play.</p>
        </Message>
    );
};

export const RandomNumberWaitMessage = () => (
    <div className="wrapper-4">
        <Message
            className="message-info text-left mb-15"
            heading="Waiting for contract to update."
            list={[`This could take up to ${settings.randomNumberWaitTime.seconds} seconds`]}
        />
    </div>
);

export const OraclizeErrorMessage = () => {
    return (
        <div className="wrapper-4">
            <Message
                className="message-danger text-left mb-15"
                heading="Oraclize Error"
                list={[
                    "Unfortunately, we were unable to retrieve a random number from Oraclize " +
                    "to start a new game.",
                    "Please click on Start New Game to generate a new game and try again."
                ]}
            />
        </div>
    );
};

export const TransactionMessage = (props) => {
    return (
        <div className="wrapper-4">
            <Message
                className="mt-15 message-info text-left"
                heading="Waiting for transaction confirmation"
                list={[
                    "Please allow up to 30 seconds for the transaction to " +
                    "be processed and written to the Ethereum blockchain."
                ]}
                {...props}
            />
        </div>
    );
};