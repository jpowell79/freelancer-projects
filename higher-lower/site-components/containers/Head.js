import React, {Component} from "react";
import NextHead from "next/head";
import "../../sass/style.scss";

class Head extends Component {
    render(){
        return (
            <NextHead>
                <title>NextApp</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="/_next/static/style.css"/>
                {this.props.children}
            </NextHead>
        );
    }
}

export default Head;