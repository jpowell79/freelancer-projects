import React from "react";

export const Address = ({address, style = {}}) => {
    return (
        <span style={{wordBreak: "break-all", ...style}}>
            {address}
        </span>
    );
};