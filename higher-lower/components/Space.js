import React from "react";
import {classNames} from "../services/className";

export const Space = ({danger, className = "", ...props}) => {
    const spaceClass = classNames({
        "danger": danger
    }, className);
    const fogClass = classNames({
        "danger": danger
    });

    return (
        <div id="space" className={spaceClass} {...props}>
            <span id="fog" className={fogClass}/>
            <span id="fog-2" className={fogClass}/>
            <span id="glow"/>
            <span id="light"/>
            <span id="stars"/>
            <span id="stars-2"/>
            <span id="small-stars"/>
            <span id="small-stars-2"/>
        </div>
    );
};