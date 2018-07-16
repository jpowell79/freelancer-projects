import React, {Component} from 'react';
import App from 'next/app'
import {initStore} from '../redux/store'
import {isServer} from "../services/utils";
import axios from 'axios';
import urls from '../server/services/utils/urls';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';
const __HAS_DATABASE__ = '__HAS_DATABASE__';

function getOrCreateStore(initialState) {
    if (isServer()) {
        return initStore(initialState);
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = initStore(initialState);
    }

    return window[__NEXT_REDUX_STORE__];
}

async function hasDatabaseConnection(){
    if(isServer()){
        return global.db !== null;
    }

    if (!window[__HAS_DATABASE__]) {
        const response = await axios.get(urls.cryptoData);
        window[__HAS_DATABASE__] = (response.data !== 'Database not connected.');
    }

    return window[__HAS_DATABASE__];
}

export default (App) => {
    return class Redux extends Component {
        static async getInitialProps (appContext) {
            const reduxStore = getOrCreateStore();
            appContext.ctx.reduxStore = reduxStore;
            appContext.ctx.hasDatabase = await hasDatabaseConnection();

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(appContext);
            }

            return {
                ...appProps,
                initialReduxState: reduxStore.getState()
            }
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