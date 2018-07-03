import React from 'react';
import {fullWidthSegment} from "../../../services/cssUtils/index";
import {joinClassNames} from "../../../services/utils/index";

export const PageTitle = ({title, className = '', children = null, ...props}) => {
    return (
        <section {...props} className={joinClassNames(fullWidthSegment('skinny'), props)}>
            <h1 className="page-title">{title}</h1>
            {children}
        </section>
    );
};