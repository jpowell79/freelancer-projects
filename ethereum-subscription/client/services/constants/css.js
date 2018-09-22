import {joinClassNames} from "../className";

export const hideOnTablet = (className = "") =>{
    return joinClassNames("remove-lg", className);
};

export const showOnMobile = (className = "") =>{
    return joinClassNames("hide-sm", className);
};

export const hideOnMobile = (className = "") =>{
    return joinClassNames("remove-sm", className);
};

export const fullWidthSegment = (className = "") =>{
    return joinClassNames(`ui full width segment`, className);
};

export const colors = {
    primary: "#7ab200",
    auxilary: "#db2828",
    secondary: "#33363f",
    white: "#ffffff",
    black: "#000000",
    gray: "#F9F9F9",
    gray2: "#f3f5f6",
    gray3: "#f0f2f4",
    darkGray: "#CFCFD0",
    uiBlue: "#2185d0",
    uiIndigo: "#6610f2",
    uiPurple: "#a333c8",
    uiPink: "#e03997",
    uiOrange: "#cf590c",
    uiYellow: "#cd9903",
    uiOlive: "#b5cc18",
    uiGreen: "#198f35",
    uiTeal: "#00b5ad",
    uiGray: "#767676",
    uiBrown: "#a5673f",
    uiViolet: "#6435c9",
    uiBlack: "#1b1c1d",
};