import React from 'react';
import Animation from './Animation';
import {Segment} from 'semantic-ui-react';

export const Notice = ({open = true, children, style = {}, ...props}) => {
    const noticeStyle = Object.assign({}, {
        position: "fixed",
        left: "15px",
        bottom: "15px",
        zIndex: "9999"
    }, style);

    return (
        <Animation
            status={(open) ? Animation.status.IN : Animation.status.OUT}
            duration={500}
        >
            <Segment
                style={noticeStyle}
                {...props}
            >
                {children}
            </Segment>
        </Animation>
    );
};

export default Notice;