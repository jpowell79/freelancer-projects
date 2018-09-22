import classnames from "classnames";

export const spreadClassName = (string = "") => {
    return (string === "") ? {} : {
        className: string
    };
};

export const classNames = (optionalClasses, className2 = "") => {
    return classnames(optionalClasses, className2);
};

export const joinClassNames = (className1, className2 = "") => {
    return (className2 === "") ? className1 : [className1, className2].join(" ");
};