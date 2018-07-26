import React from 'react';
import {joinClassNames} from "../services/className";

export const Times = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames('times icon', className)}/>;

export const CheckCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames('check circle icon', className)}/>;

export const ExclamationCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames('exclamation circle icon', className)}/>;

export const InfoCircle = ({className = "", ...props}) =>
    <i {...props} className={joinClassNames('info circle icon', className)}/>;

export const MobileMenuIcon = ({className = "", ...props}) => (
    <div {...props} className={joinClassNames("mobile-menu-icon", className)}>
        <div/>
        <div/>
        <div/>
    </div>
);