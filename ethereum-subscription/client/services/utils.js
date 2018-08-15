import strings from '../../services/strings';

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
    return hasResponseData(err) ? err.response.data : err.toString();
};