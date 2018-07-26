import React, {Component} from 'react';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types';
import {className} from "../services/className";

class Page extends Component {
    static defaultProps = {
        head: null,
        header: null,
        footer: null,
        pageClass: '',
        headerClass: '',
        contentClass: '',
        footerClass: ''
    };

    static propTypes = {
        head: PropTypes.element,
        header: PropTypes.element,
        footer: PropTypes.element,
        pageClass: PropTypes.string,
        headerClass: PropTypes.string,
        contentClass: PropTypes.string,
        footerClass: PropTypes.string
    };

    render(){
        return (
            <div id="page" {...className(this.props.pageClass)}>
                <Head>
                    {this.props.head}
                </Head>
                <Header id="page-header" {...className(this.props.headerClass)}>
                    {this.props.header}
                </Header>
                <section id="page-content" {...className(this.props.contentClass)}>
                    {this.props.children}
                </section>
                <Footer id="page-footer" {...className(this.props.footerClass)}>
                    {this.props.footer}
                    <script
                        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossOrigin="anonymous"/>
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossOrigin="anonymous"/>
                    <script
                        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                        crossOrigin="anonymous"/>
                </Footer>
            </div>
        );
    }
}

export default Page;