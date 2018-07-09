import {joinClassNames} from "../utils/index";

export const hideOnMobile = (className = '') => {
    return joinClassNames("hide-xxs show-md", className);
};

export const sortableTable = (className = '') =>{
    return joinClassNames("ui unstackable selectable sortable very " +
        "compact celled small table sortable-table", className);
};

export const definitionTable = (className = '') => {
    return joinClassNames("ui definition table", className);
};

export const titledSegmentHeader = (className = '') => {
    return joinClassNames("ui top attached padded header", className);
};

export const titledSegmentContent = (className = '') => {
    return joinClassNames(`ui attached padded segment`, className);
};

export const fullWidthSegment = (className = '') => {
    return joinClassNames(`ui full width segment`, className);
};

export const twoColumnGrid = (className = '') => {
    return joinClassNames(`ui relaxed two column stackable grid`, className);
};

export const doublingThreeColumnGrid = (className = '') => {
    return joinClassNames('ui stackable three column doubling grid', className);
};

export const doublingFourColumnGrid = (className = '') => {
    return joinClassNames('ui stackable four column doubling grid', className);
};

export const stickyOnScroll = (className = '') => {
    return joinClassNames("sticky-on-scroll not-sticky", className);
};

export const COLORS = {
    primary: 'primary',
    primary2: 'primary2',
    primary3: 'primary3',
    primary4: 'primary4',
    darkPrimary: 'darkPrimary',
    darkPrimary2: 'darkPrimary2',
    darkPrimary3: 'darkPrimary3',
    darkPrimary4: 'darkPrimary4',
    auxilary: 'auxilary',
    auxilary2: 'auxilary2',
    auxilary3: 'auxilary3',
    auxilary4: 'auxilary4',
    secondary: 'secondary',
    white: 'white',
    black: 'black',
    gray: 'gray',
    gray2: 'gray2',
    gray3: 'gray3',
    uiBlue: 'uiBlue',
    uiYellow: 'uiYellow',
    uiOrange: 'uiOrange',
    uiTeal: 'uiTeal',
    uiRed: 'uiRed',
    uiGreen: 'uiGreen',
    uiPink: 'uiPink',
    uiPurple: 'uiPurple',
    uiIndigo: 'uiIndigo',
    uiBrown: 'uiBrown',
    uiOlive: 'uiOlive',
    uiViolet: 'uiViolet',
    uiBlack: 'uiBlack'
};