import React, {Component} from 'react';
import {Accordion} from 'semantic-ui-react';
import {CONTRACT_ADDRESSES} from '../../../../site-settings';
import {Dropdown} from "../../../modules/icons/index";
import Paths from "../../../../services/Paths/index";
import Settings from "../../../../site-settings";

const TEMP_DIVIDEND = '0x0baebf4d24adb328a9a5f62c09a0ba108761dede';
const TEMP_PRICING = '0x44aaee348a5a0259cf2116950e4c1aadda3be41d';

class SmartContractList extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeIndexes: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.renderContract = this.renderContract.bind(this);
    }

    handleClick(e, titleProps){
        const { index } = titleProps;

        if(this.state.activeIndexes.includes(index)){
            this.setState((prevState) => {
                return {
                    activeIndexes: prevState.activeIndexes.filter(activeIndex =>
                        activeIndex !== index
                    )
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    activeIndexes: [...prevState.activeIndexes, index]
                }
            });
        }
    }

    renderContract(contractName, address, i){
        const {activeIndexes} = this.state;

        return (
            <div className="ui padded segment">
                <h2 className="ui header display-5">
                    <a href={`${Paths.getCryptoPage()}?index=${i}`}>{contractName}_contract</a>
                    <div className="sub header h3 lighter">
                        <a href={Paths.getEtherScanUrl(address)}>{address}</a>
                    </div>
                </h2>
                <Accordion styled>
                    <Accordion.Title
                        active={activeIndexes.includes(i)}
                        index={i}
                        onClick={this.handleClick}>
                        <Dropdown/>
                        <div className="content">
                            Smart Contract Links
                        </div>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndexes.includes(i)}>
                        <h3 className="no-margin-bottom">{contractName} pricing: <a className="lighter" href={
                            `${Paths.getEtherScanUrl(Settings.PRICING_ADDRESS)}`
                        }>
                            {Settings.PRICING_ADDRESS}
                        </a></h3>
                        <h3 style={{marginTop: ".75em"}}>Dividend contract: <a className="lighter" href={
                            `${Paths.getEtherScanUrl(Settings.DIVIDEND_ADDRESS)}`
                        }>
                            {Settings.DIVIDEND_ADDRESS}
                        </a></h3>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }

    render(){
        return (
            <div className="ui very relaxed list">
                {CONTRACT_ADDRESSES.map((address, i) => {
                    let contractName = (i+1 <= 9) ? `crypto_0${i+1}` : `crypto_${i+1}`;

                    return (
                        <div key={i} className="item">
                            {this.renderContract(contractName, address, i)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SmartContractList;