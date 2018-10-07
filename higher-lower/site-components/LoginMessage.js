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