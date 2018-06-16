import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {joinClassNames} from "../utils";
import $ from 'jquery';

class TwitterWidget extends Component {
    static dataThemes = {
        dark: "dark",
        light: "light"
    };

    static suggestedLinkColors = {
        purple: "#981CEB",
        green: "#19CF86",
        yellow: "#FAB81E",
        orange: "#E95F28",
        red: "#E81C4F",
        blue: "#2185d0"
    };

    static defaultProps = {
        dataTheme: TwitterWidget.dataThemes.light,
        dataLinkColor: TwitterWidget.suggestedLinkColors.blue,
        dataHeight: "425px",
        dataWidth: "",
        className: ""
    };

    static propTypes = {
        feed: PropTypes.string.isRequired,
        dataTheme: PropTypes.string,
        dataLinkColor: PropTypes.string,
        dataHeight: PropTypes.string,
        dataWidth: PropTypes.string,
        className: PropTypes.string
    };

    componentDidMount(){
        if($('#twitter-timeline-script').length === 0){
            $('body').append(
                `<script 
                    id="twitter-timeline-script"
                    async 
                    src="https://platform.twitter.com/widgets.js" 
                    charset="utf-8"></script>`
            );
        }
    }

    componentWillUnmount(){
        let $twitterTimelineScript = $('#twitter-timeline-script');

        if($twitterTimelineScript.length > 0) {
            $twitterTimelineScript.remove();
        }
    }

    render(){
        let {
            feed,
            dataTheme,
            dataLinkColor,
            dataHeight,
            dataWidth,
            className
        } = this.props;

        return (
            <a className={joinClassNames("twitter-timeline", className)}
               data-theme={dataTheme}
               data-link-color={dataLinkColor}
               data-height={dataHeight}
               data-width={dataWidth}
               href={`https://twitter.com/${feed}?ref_src=twsrc%5Etfw`}/>
        );
    }
}

export default TwitterWidget;