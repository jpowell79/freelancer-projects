export const isClient = () => (
    typeof window !== "undefined"
);

export const isServer = () => (
    typeof window === "undefined"
);

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

export const parseErrorString = (err) => {
    let error = hasResponseData(err) ? err.response.data : err.toString();

    if(Array.isArray(error)){
        error = error[0];
    }

    error = error.replace(/Error: /g, "");
    error = error.replace(/Returned error: /g, "");

    return error;
};