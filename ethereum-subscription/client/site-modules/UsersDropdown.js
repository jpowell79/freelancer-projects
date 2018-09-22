import React from "react";
import {Dropdown} from "semantic-ui-react";

export const UserDropdown = ({users, ...props}) => {
    const options = users.map(user => ({
        value: user.username,
        text: user.username
    }));

    return (
        <Dropdown
            search
            selection
            options={options}
            {...props}
        />
    );
};