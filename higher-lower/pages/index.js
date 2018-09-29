import React, {Component} from "react";
import Page from "../site-components/containers/Page";
import {connect} from "react-redux";

class Index extends Component {
    render () {
        return (
            <Page>
                <h1>Hello Next, Redux, React, SCSS and Jest setup!</h1>
                <p>
                    <span id="fog">A long</span>
                    <span id="fog-2">long time</span>
                    <span id="glow">ago,</span>
                    <span id="light">in a</span>
                    <span id="stars">galaxy</span>
                    <span id="stars-2">far</span>
                    <span id="small-stars">far</span>
                    <span id="small-stars-2">away…</span>
                </p>
            </Page>
        )
    }
}

export default connect()(Index);