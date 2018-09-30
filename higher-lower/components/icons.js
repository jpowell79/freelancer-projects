import {joinClassNames} from "../services/className";

export const Twitter = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("fab fa-twitter", className)}/>;

export const Medium = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("fab fa-medium", className)}/>;

export const Reddit = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("fab fa-reddit", className)}/>;

export const Telegram = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("fab fa-telegram", className)}/>;

export const Github = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("fab fa-github", className)}/>;