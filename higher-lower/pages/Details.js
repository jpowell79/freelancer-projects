import React, {Component} from "react";
import {connect} from "react-redux";
import Page from "../site-components/containers/Page";
import {Space} from "../components/Space";

class Details extends Component {
    static mapStateToProps = ({dangerMode}) => ({dangerMode});

    render () {
        return (
            <Page header={<Space danger={this.props.dangerMode}/>} contentClass="full-width">
                <h1>Details</h1>
            </Page>
        )
    }
}

export default connect(Details.mapStateToProps)(Details);