import React, {Component} from "react";
import {loadServerDataIntoStore} from "../services/loaders/loadServerDataIntoStore";

export default (PageComponent) => {
    return class ServerData extends Component {
        static async getInitialProps (appContext) {
            let pageProps = {};

            const {reduxStore, req} = appContext.ctx;

            await loadServerDataIntoStore(reduxStore, req, {
                settings: true,
                user: true,
                users: true,
                subscriptionTypes: true,
                subscribers: true,
                subscriptionContracts: true,
                subscriptions: true,
            });

            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(appContext);
            }

            return {...pageProps};
        }

        render() {
            return <PageComponent {...this.props}/>
        }
    }
}

