import React from "react";
import {Message} from "semantic-ui-react";

export const LoginMessage = ({address}) => {
    return (
        <Message
            header="We were unable to detect the metamask account linked to this user"
            list={[
                `Please login to the metamask account with the address: ${address}`
            ]}
        />
    );
};