import React from "react";
import {Message} from "../components/containers/Message";

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