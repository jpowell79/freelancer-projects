import {joinClassNames} from './className';

export const hideOnMobile = (className = '') => {
    return joinClassNames("hide-xxs show-sm", className);
};

export const sortableTable = (className = '') => {
    return joinClassNames("ui unstackable selectable sortable very " +
        "compact celled small table sortable-table", className);
};

export const fullWidthSegment = (className = '') => {
    return joinClassNames(`ui full width segment`, className);
};
