import React, {Component} from "react";
import {loadServerDataIntoStore} from "../services/loadServerDataIntoStore";

export default (PageComponent) => {
    return class ServerData extends Component {
        static async getInitialProps (appContext) {
            let pageProps = {};

            if (PageComponent.getInitialProps) {
                pageProps = await PageComponent.getInitialProps(appContext);
            }

            const {reduxStore, req} = appContext.ctx;

            await loadServerDataIntoStore(reduxStore, req, {
                settings: true,
                user: true,
                subscriptionTypes: true,
                subscribers: true,
                subscriptionContracts: true,
                subscriptions: true,
            });

            return {...pageProps};
        }

        render() {
            return <PageComponent {...this.props}/>
        }
    }
}

