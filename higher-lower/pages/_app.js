import NextApp, {Container} from "next/app";
import React from "react";
import withReduxStore from "../components/hocs/withReduxStore";
import {Provider} from "react-redux";

class App extends NextApp {
    render () {
        const {Component, pageProps, reduxStore} = this.props;
        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withReduxStore(App);