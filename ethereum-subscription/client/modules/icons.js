import React from "react";
import {joinClassNames} from "../services/className";

export const Loader = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader", className)}/>;

export const LoaderSmall = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader-small", className)}/>;

export const LoaderTiny = ({className = "", ...props}) =>
    <div {...props} className={joinClassNames("loader-tiny", className)}/>;

export const Star = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("star icon", className)}/>;

export const ArrowLeft = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("arrow left icon", className)}/>;

export const Times = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("times icon", className)}/>;

export const CheckCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("check circle icon", className)}/>;

export const ExclamationCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("exclamation circle icon", className)}/>;

export const InfoCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("info circle icon", className)}/>;

export const MobileMenuIcon = ({className = "", ...props}) => (
    <div {...props} className={joinClassNames("mobile-menu-icon", className)}>
        <div/>
        <div/>
        <div/>
    </div>
);

export const Twitter = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("twitter icon", className)}/>;

export const Medium = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("medium icon", className)}/>;

export const Reddit = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("reddit icon", className)}/>;

export const Telegram = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("telegram icon", className)}/>;

export const Github = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames("github icon", className)}/>;