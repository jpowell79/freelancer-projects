import React, {Component} from "react";
import DatabaseDataLoader from "../services/loaders/DatabaseDataLoader";
import {getChildProps} from "../services/utils";

export default (loadOptions = {}) => (App) => {
    return class DatabaseData extends Component {
        static async getInitialProps (appContext) {
            const {reduxStore, req} = appContext.ctx;

            await new DatabaseDataLoader(
                reduxStore.dispatch,
                Object.assign({}, {
                    settings: true,
                    user: true,
                    users: true,
                    suspendedUsers: true,
                    subscriptionTypes: true,
                    subscribers: true,
                    subscriptionContracts: true,
                    subscriptions: true
                }, loadOptions),
                req
            ).loadFromServerSide(reduxStore.getState());

            return await getChildProps(App, appContext);
        }

        render() {
            return <App {...this.props}/>;
        }
    }
}

