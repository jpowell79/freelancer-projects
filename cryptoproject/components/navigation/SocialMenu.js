import React from 'react';
import {joinClassNames} from "../utils";
import {
    Telegram,
    Twitter,
    Github,
    Reddit,
    Medium
} from "../icons";

export const SocialMenu = ({className, ...props}) => {
    return(
        <nav {...props} className={joinClassNames("social-menu round", className)}>
            <a href="https://github.com"><Github/></a>
            <a href="https://twitter.com"><Twitter/></a>
            <a href="https://reddit.com"><Reddit/></a>
            <a href="https://telegram.org"><Telegram/></a>
            <a href="https://medium.com"><Medium/></a>
        </nav>
    );
};