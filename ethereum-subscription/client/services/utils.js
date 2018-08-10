export const getChildProps = async (ChildClass, appContext) => {
    let childProps = {};

    if (ChildClass.getInitialProps) {
        childProps = await ChildClass.getInitialProps(appContext);
    }

    return {...childProps};
};