import React, {Component} from "react";
import NextHead from "next/head";
import "../sass/style.scss";
import {connect} from "react-redux";

class Head extends Component {
    static mapStateToProps = ({settings}) => ({settings});

    render(){
        return (
            <NextHead>
                <title>{this.props.settings.siteTitle.value}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet"
                      href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"/>
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
                    rel="stylesheet"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                {this.props.children}
            </NextHead>
        );
    }
}

export default connect(Head.mapStateToProps)(Head);