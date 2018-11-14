import React from "react";
import {classNames} from "../services/className";

export const Button = ({
    className,
    loading = false,
    outlined = false,
    message = false,
    segment = false,
    disabled = false,
    children,
    ...props
}) => {
    const buttonClass = classNames({
        "button": true,
        "message": message,
        "segment": segment,
        "outlined": outlined,
        "loading": loading,
        "disabled": disabled
    }, className);

    return (
        <button disabled={disabled} className={buttonClass} {...props}>
            {children}
        </button>
    );
};