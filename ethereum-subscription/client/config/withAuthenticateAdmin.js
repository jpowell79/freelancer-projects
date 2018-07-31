import React, {Component} from "react";
import {redirectIfNotLoggedInAdmin} from "../../services/constants/paths";
import paths from "../../services/constants/paths";

export default (PageComponent) => {
    return class Authenticate extends Component {
        static async getInitialProps (appContext) {
            const {req, res} = appContext;
            await redirectIfNotLoggedInAdmin(paths.pages.login, req, res);

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