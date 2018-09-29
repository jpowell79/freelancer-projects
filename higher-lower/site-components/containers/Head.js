import React, {Component} from "react";
import NextHead from "next/head";
import "../../sass/style.scss";

class Head extends Component {
    render(){
        return (
            <NextHead>
                <title>NextApp</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
                    rel="stylesheet"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                {this.props.children}
            </NextHead>
        );
    }
}

export default Head;