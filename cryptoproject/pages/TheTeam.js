import React, {Component} from 'react';
import Page from '../components/containers/Page';
import {PageTitle} from "../components/modules/PageTitle";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import Paths from "../services/Paths";

class TheTeam extends Component {
    render(){
        const {
            bordered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page>
                <PageTitle title="The Team"/>
                <img src={Paths.getTeamImage('viktor_jurasek')}/>
            </Page>
        );
    }
}

export default TheTeam;