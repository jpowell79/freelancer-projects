import React from 'react';
import {joinClassNames} from "../../../services/utils";
import Strings from "../../../services/Strings";

export const ListMenu = ({links, title = '', className = '', ...props}) => {
    return (
        [
            (title !== '')
                ? <h4 key={1} className={joinClassNames("ui header", className)}>{title}</h4>
                : null,
            <div key={2} {...props}
                 className={joinClassNames("ui fluid vertical bulletless link list", className)}>
                {links.map((link, i) => {
                    if(!Strings.isDefined(link.href)){
                        return (
                            <div key={i} className="item">
                                <a className="ui">{link.name}</a>
                            </div>
                        );
                    }

                    return (
                        <div key={i} className="item">
                            <a href={link.href} className="ui">{link.name}</a>
                        </div>
                    );
                })}
            </div>
        ]
    );
};