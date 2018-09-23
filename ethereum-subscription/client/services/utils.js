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
    let error = hasResponseData(err) ? err.response.data : err.toString();

    if(Array.isArray(error)){
        error = error[0];
    }

    error = error.replace(/Error: /g, "");
    error = error.replace(/Returned error: /g, "");

    if(error.includes("Invalid \"from\"")){
        error = "Unauthorized ethereum account";
    } else if(error.includes("SequelizeUniqueConstraintValidation")){
        error = "The given contract already exists";
    }

    return error;
};

export const childrenToArray = (children) => {
    return (objects.length(children) <= 1) ? [children] : children;
};