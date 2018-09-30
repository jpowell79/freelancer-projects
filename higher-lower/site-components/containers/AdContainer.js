import React from "react";
import {joinClassNames} from "../../../ethereum-subscription/client/services/className";

export const AdContainer = ({className = "", children, ...props}) => {
    return (
        <div className={joinClassNames("ad", className)} {...props}>
            {children}
        </div>
    );
};