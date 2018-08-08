import App, {Container} from 'next/app';
import React from 'react';
import withServerData from '../hocs/withServerData';
import withReduxStore from '../hocs/withReduxStore';
import { Provider } from 'react-redux';

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

export default withReduxStore(withServerData(MyApp));