import React, {Component} from 'react';
import {Accordion, Icon} from 'semantic-ui-react';
import {CONTRACT_ADDRESSES} from '../../site-settings';

const TEMP_DIVIDEND = '0x0baebf4d24adb328a9a5f62c09a0ba108761dede';
const TEMP_PRICING = '0x44aaee348a5a0259cf2116950e4c1aadda3be41d';

class SmartContractGrid extends Component {
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
                <h2 className="ui header">
                    {contractName}_contract
                    <div className="sub header">
                        <a href={`https://etherscan.io/address/${address}`}>{address}</a>
                    </div>
                </h2>
                <Accordion styled>
                    <Accordion.Title
                        active={activeIndexes.includes(i)}
                        index={i}
                        onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        Smart Contract Links
                    </Accordion.Title>
                    <Accordion.Content active={activeIndexes.includes(i)}>
                        <table className="stacked-table">
                            <tbody>
                            <tr>
                                <td>
                                    {contractName}_pricing:
                                </td>
                                <td>
                                    <a href={`https://etherscan.io/address/${TEMP_PRICING}`}>
                                        {TEMP_PRICING}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    dividend_contract:
                                </td>
                                <td>
                                    <a href={`https://etherscan.io/address/${TEMP_DIVIDEND}`}>
                                        {TEMP_DIVIDEND}
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }

    render(){


        return (
            <div className="ui stackable two column grid">
                {CONTRACT_ADDRESSES.map((address, i) => {
                    let contractName = (i+1 <= 9) ? `crypto_0${i+1}` : `crypto_${i+1}`;

                    return (
                        <div key={i} className="column">
                            {this.renderContract(contractName, address, i)}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SmartContractGrid;