import React, {Component} from "react";
import Page from "../site-components/containers/Page";
import {connect} from "react-redux";
import {Space} from "../components/Space";

class Index extends Component {
    render () {
        return (
            <Page header={<Space/>}>
                <h1>Hello Next, Redux, React, SCSS and Jest setup!</h1>
            </Page>
        )
    }
}

export default connect()(Index);