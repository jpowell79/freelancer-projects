import React from 'react';
import Paths from '../utils/Paths';
import Link from 'next/link';
import {joinClassNames} from "../utils";

export const MainMenu = ({className, ...props}) => {
    return (
        <nav {...props} className={joinClassNames("ui labeled stackable menu", className)}>
            <img className="hide-xxs show-sm" src={Paths.getImage('logo', 'small')}/>
            <div className="right menu">
                <Link href="/"><a className="item">Table</a></Link>
                <a className="item">Trade</a>
                <a className="item">How it Works</a>
                <a className="item">The Team</a>
                <a className="item">Historic Data</a>
                <a className="item">Contact</a>
            </div>
        </nav>
    );
};