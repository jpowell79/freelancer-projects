import strings from "../../services/datatypes/strings";
import objects from "../../services/datatypes/objects";

export const getChildProps = async (ChildClass, appContext) => {
    let childProps = {};

    if (ChildClass.getInitialProps) {
        childProps = await ChildClass.getInitialProps(appContext);
    }

    return {...childProps};
};

export const hasResponseData = (err) => {
    if(!err.response) return false;

    return strings.isDefined(err.response.data);
};

export const getErrorString = (err) => {
    const error = hasResponseData(err) ? err.response.data : err.toString();

    return (error.startsWith("Error: ")) ? error.split("Error: ")[1] : error;
};

export const childrenToArray = (children) => {
    return (objects.length(children) <= 1) ? [children] : children;
};