import React, {Component} from "react";
import App from "next/app";
import {initStore} from "../../redux/store";
import {isServer} from "../../services/utils";

const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
    if (isServer()) {
        return initStore(initialState);
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__];
}

export default (App) => {
    return class Redux extends Component {
        static async getInitialProps (appContext) {
            const reduxStore = getOrCreateStore();
            appContext.ctx.reduxStore = reduxStore;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            };
        }

        constructor(props) {
            super(props);
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        render() {
            return <App {...this.props} reduxStore={this.reduxStore} />
        }
    }
}