import React from 'react';
import {joinClassNames} from "../../../services/utils/index";

export const SocialMenu = ({links, title = '', titleClass = '', className = '', ...props}) => {
    return(
        [
            (title !== '')
                ? <h4 key={1} className={joinClassNames("ui header", titleClass)}>{title}</h4>
                : null,
            <nav key={2} {...props} className={joinClassNames("social-menu round", className)}>
                {links.map((link, i) => {
                    return (
                        <a key={i} href={link.href}>{link.icon}</a>
                    );
                })}
            </nav>
        ]
    );
};