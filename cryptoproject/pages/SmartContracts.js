import React, {Component} from 'react';
import Page from '../components/containers/Page';
import SmartContractList from "../components/pages/smart-contracts/SmartContractList";
import {PageTitle} from "../components/containers/PageTitle";
import FullWidthSegment from "../components/containers/FullWidthSegment";

class SmartContracts extends Component {
    render(){
        const {
            bordered
        } = FullWidthSegment.options;

        const {
            gray
        } = FullWidthSegment.options.colors;

        return (
            <Page>
                <PageTitle title="Smart Contracts"/>
                <FullWidthSegment options={[gray, bordered]} wrapper={2}>
                    <SmartContractList/>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default SmartContracts;