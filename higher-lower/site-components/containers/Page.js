import React, {Component} from "react";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";
import {spreadClassName} from "../../services/className";

class Page extends Component {
    static defaultProps = {
        head: null,
        header: null,
        sidebar: null,
        footer: null,
        pageClass: "",
        headerClass: "",
        contentClass: "",
        footerClass: ""
    };

    static propTypes = {
        head: PropTypes.element,
        header: PropTypes.element,
        sidebar: PropTypes.element,
        footer: PropTypes.element,
        pageClass: PropTypes.string,
        headerClass: PropTypes.string,
        contentClass: PropTypes.string,
        footerClass: PropTypes.string
    };

    render(){
        return (
            <div id="page" {...spreadClassName(this.props.pageClass)}>
                <Head>
                    {this.props.head}
                </Head>
                <Header id="page-header" {...spreadClassName(this.props.headerClass)}>
                    {this.props.header}
                </Header>
                <section id="page-content" {...spreadClassName(this.props.contentClass)}>
                    {this.props.children}
                </section>
                <Sidebar id="page-sidebar">
                    {this.props.sidebar}
                </Sidebar>
                <Footer id="page-footer" {...spreadClassName(this.props.footerClass)}>
                    {this.props.footer}
                </Footer>
            </div>
        );
    }
}

export default Page;