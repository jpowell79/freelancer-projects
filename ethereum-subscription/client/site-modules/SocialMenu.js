import React from 'react';
import {joinClassNames} from "../services/className";
import {Github, Medium, Reddit, Telegram, Twitter} from "../modules/icons";

export const SocialMenu = ({className = '', ...props}) => {
    return (
        <nav className={joinClassNames("social-menu round", className)} {...props}>
            <a target="_blank" href="https://github.com"><Github/></a>
            <a target="_blank" href="https://twitter.com"><Twitter/></a>
            <a target="_blank" href="https://reddit.com"><Reddit/></a>
            <a target="_blank" href="https://telegram.org"><Telegram/></a>
            <a target="_blank" href="https://medium.com"><Medium/></a>
        </nav>
    );
};