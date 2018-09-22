import React, {Component} from "react";
import {redirectIfNotLoggedInSupplier} from "../../services/constants/paths";
import paths from "../../services/constants/paths";
import {getChildProps} from "../services/utils";

export default (PageComponent) => {
    return class Authenticate extends Component {
        static async getInitialProps (appContext) {
            const {req, res} = appContext;
            await redirectIfNotLoggedInSupplier(paths.pages.login, req, res);

            return await getChildProps(PageComponent, appContext);
        }

        render() {
            return <PageComponent {...this.props}/>
        }
    }
}