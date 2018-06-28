import React, {Component} from 'react';
import Page from '../components/containers/Page';
import SmartContractGrid from "../components/SmartContractGrid";
import {
    titledSegmentHeader,
    titledSegmentContent
} from "../services/cssUtils";

class SmartContracts extends Component {
    render(){
        return (
            <Page contentClass="wrapper">
                <h2 className={titledSegmentHeader()}>
                    Smart Contracts:
                </h2>
                <div className={titledSegmentContent()}>
                    <SmartContractGrid/>
                </div>
            </Page>
        );
    }
}

export default SmartContracts;