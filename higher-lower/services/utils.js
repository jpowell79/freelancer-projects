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