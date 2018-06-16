import React from 'react';
import Paths from '../utils/Paths';
import Link from 'next/link';
import {hideOnMobile} from "../utils/cssUtils";
import {joinClassNames} from "../utils";

export const MainMenu = ({className, ...props}) => {
    return (
        <nav {...props} className={joinClassNames("ui labeled stackable menu", className)}>
            <Link href="/"><a><img className={hideOnMobile()} src={Paths.getImage('logo', 'small')}/></a></Link>
            <div className="right menu">
                <a className="item">Trade</a>
                <a className="item">How it Works</a>
                <a className="item">The Team</a>
                <a className="item">Historic Data</a>
                <a className="item">Contact</a>
            </div>
        </nav>
    );
};