import React, {Component} from 'react';
import Page from '../components/containers/Page';
import {PageTitle} from "../components/modules/PageTitle";
import FullWidthSegment from "../components/containers/FullWidthSegment";
import {Team} from "../components/pages/the-team/Team";

class TheTeam extends Component {
    render(){
        const {
            skinny
        } = FullWidthSegment.options;

        return (
            <Page>
                <PageTitle title="The Team" className="text-center">
                    <p className="h2 lighter">The crypto trade team consists of the following members:</p>
                </PageTitle>
                <FullWidthSegment options={[skinny]} wrapper={1}>
                    <Team/>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default TheTeam;