import React, {Component} from "react";
import {redirectIfNotLoggedInSupplier} from "../../services/paths";
import paths from "../../services/paths";

export default (PageComponent) => {
    return class Authenticate extends Component {
        static async getInitialProps (appContext) {
            const {req, res} = appContext;
            await redirectIfNotLoggedInSupplier(paths.pages.login, req, res);

            let pageProps = {};

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