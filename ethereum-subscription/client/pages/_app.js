import App, {Container} from "next/app";
import React from "react";
import {compose} from "redux";
import withDatabaseData from "../hocs/withDatabaseData";
import withReduxStore from "../hocs/withReduxStore";
import { Provider } from "react-redux";

class MyApp extends App {
    constructor(props){
        super(props);
    }

    render () {
        const {Component, pageProps, reduxStore} = this.props;

        return (
            <Container>
                <Provider store={reduxStore}>
                    <Component {...pageProps}/>
                </Provider>
            </Container>
        )
    }
}

export default compose(
    withReduxStore,
    withDatabaseData
)(MyApp);