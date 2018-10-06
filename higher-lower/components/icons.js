import React from "react";
import {joinClassNames} from "../services/className";

export const Loader = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader", className)}/>;

export const LoaderSmall = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader-small", className)}/>;

export const LoaderTiny = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader-tiny", className)}/>;

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