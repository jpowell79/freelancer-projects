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
    return joinClassNames("ui top attached padded bg-color-light-gray header", className);
};

export const titledSegmentContent = (className = '') => {
    return joinClassNames(`ui attached padded segment`, className);
};

export const twoColumnGrid = (className = '') => {
    return joinClassNames(`ui padded stackable centered grid two-column`, className);
};