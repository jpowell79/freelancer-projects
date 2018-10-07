import React from "react";
import {classNames} from "../../services/className";

export const Message = ({
    show = true,
    heading,
    list = [],
    children,
    className,
    ...props
}) => {
    const messageClass = classNames({
        "message": className,
        "hide": !show
    }, className);

    return (
        <div className={messageClass} {...props}>
            {(heading) && (<h4 className="heading">{heading}</h4>)}
            {(list.length > 0) && (
                <ul>
                    {list.map((listItem, i) => <li key={i}>{listItem}</li>)}
                </ul>
            )}
            {children}
        </div>
    );
};