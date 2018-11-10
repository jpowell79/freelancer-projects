import React from "react";
import {Message} from "semantic-ui-react";

export const EditSubscriptionMessage = () => {
    return (
        <Message
            info
            header="Information"
            list={[
                "If your service requires login credentials, please ensure you submit a " +
                "username and password to the smart contract before you activate the " +
                "subscription.",
                "This information will only be visible to the supplier and the subscriber"
            ]}
        />
    );
};