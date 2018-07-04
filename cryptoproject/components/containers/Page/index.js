import React, {Component} from 'react';
import Head from '../Head';
import Header from '../Header/index';
import Footer from '../Footer/index';
import {connect} from 'react-redux';
import '../../../sass/style.scss';
import {TABLE_REFRESH_RATE} from "../../../site-settings";
import Dispatcher from "../../../services/Dispatcher";

class Page extends Component {
    static defaultProps = {
        head: null,
        header: null,
        footer: null,
        contentClass: '',
        addTimer: false,
        fetchMarketData: false
    };

    componentDidMount(){
        this.dispatcher = new Dispatcher(this.props.dispatch);

        if(this.props.addTimer){
            this.timer = setInterval(() => {
                this.dispatcher.fetchMarketData(this.props.dispatch)
                    .catch(err => {
                        if(this.props.addTimer) {
                            clearInterval(this.timer);
                        }

                        console.error(err);
                    });
            }, TABLE_REFRESH_RATE);
        }
    }

    componentWillUnmount(){
        if(this.props.addTimer) {
            clearInterval(this.timer);
        }
    }

    render(){
        return (
            <section id="page">
                <Head>
                    {this.props.head}
                </Head>
                <Header id="page-header">
                    {this.props.header}
                </Header>
                <main id="page-content" className={this.props.contentClass}>
                    {this.props.children}
                </main>
                <Footer id="page-footer">
                    {this.props.footer}
                </Footer>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const {crypto} = state;
    return {crypto};
};

export default connect(mapStateToProps)(Page);