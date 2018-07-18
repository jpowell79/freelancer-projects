import React, {Component} from 'react';
import NextHead from 'next/head';
import Feed from '../../modules/Feed';
import Paths from "../../../services/Paths";

class Head extends Component {
    render() {
        return (
            <NextHead>
                <title>Crypto Trade</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="stylesheet"
                      href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"/>
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
                    rel="stylesheet"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                <link rel="apple-touch-icon" sizes="57x57" href={Paths.getFaviconFile({
                    name: 'apple-icon-57x57'
                })}/>
                <link rel="apple-touch-icon" sizes="60x60" href={Paths.getFaviconFile({
                    name: 'apple-icon-60x60'
                })}/>
                <link rel="apple-touch-icon" sizes="72x72" href={Paths.getFaviconFile({
                    name: 'apple-icon-72x72'
                })}/>
                <link rel="apple-touch-icon" sizes="76x76" href={Paths.getFaviconFile({
                    name: 'apple-icon-76x76'
                })}/>
                <link rel="apple-touch-icon" sizes="114x114" href={Paths.getFaviconFile({
                    name: 'apple-icon-114x114'
                })}/>
                <link rel="apple-touch-icon" sizes="120x120" href={Paths.getFaviconFile({
                    name: 'apple-icon-120x120'
                })}/>
                <link rel="apple-touch-icon" sizes="144x144" href={Paths.getFaviconFile({
                    name: 'apple-icon-144x144'
                })}/>
                <link rel="apple-touch-icon" sizes="152x152" href={Paths.getFaviconFile({
                    name: 'apple-icon-152x152'
                })}/>
                <link rel="apple-touch-icon" sizes="180x180" href={Paths.getFaviconFile({
                    name: 'apple-icon-180x180'
                })}/>
                <link rel="icon" type="image/png" sizes="192x192" href={Paths.getFaviconFile({
                    name: 'android-icon-192x192'
                })}/>
                <link rel="icon" type="image/png" sizes="32x32" href={Paths.getFaviconFile({
                    name: 'favicon-32x32'
                })}/>
                <link rel="icon" type="image/png" sizes="96x96" href={Paths.getFaviconFile({
                    name: 'favicon-96x96'
                })}/>
                <link rel="icon" type="image/png" sizes="16x16" href={Paths.getFaviconFile({
                    name: 'favicon-16x16'
                })}/>
                <link rel="manifest" href={Paths.getFaviconFile({
                    name: 'manifest',
                    type: 'json'
                })}/>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="msapplication-TileImage" content={Paths.getFaviconFile({
                    name: 'ms-icon-144x144'
                })}/>
                <meta name="theme-color" content="#ffffff"/>
                {Feed.FEEDNAMI_SCRIPT}
                {this.props.children}
            </NextHead>
        );
    }
}

export default Head;