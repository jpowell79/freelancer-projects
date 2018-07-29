import React, {Component} from 'react';
import {Accordion} from 'semantic-ui-react';
import {CONTRACT_ADDRESSES} from '../../../../site-settings';
import {Dropdown} from "../../../modules/icons/index";
import Paths from "../../../../services/Paths/index";
import Settings from "../../../../site-settings";
import ContractItem from "../ContractItem";

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
                    <a href={`${Paths.getCryptoPage()}?index=${i}`}>{contractName} contract</a>
                    <div className="sub header h3 lighter">
                        <a href={Paths.getEtherScanAddressUrl(address)} target="_blank">{address}</a>
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
                            `${Paths.getEtherScanAddressUrl(Settings.PRICING_ADDRESS[contractName])}`
                        } target="_blank">
                            {Settings.PRICING_ADDRESS[contractName]}
                        </a></h3>
                        <h3 style={{marginTop: ".75em"}}>Token holder claim contract: <a className="lighter" href={
                            `${Paths.getEtherScanAddressUrl(Settings.TOKEN_HOLDER_CLAIM_ADDRESS)}`
                        } target="_blank">
                            {Settings.TOKEN_HOLDER_CLAIM_ADDRESS}
                        </a></h3>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }

    render(){
        return (
            <div className="ui very relaxed list">
                <ContractItem
                    titleHtml={
                        <h2 className="ui info message text-center h3">
                            The html of the contract title can be completely customized.
                        </h2>
                    }
                    accordionTitle="This is a custom accordion title"
                    accordionHtml={
                        <div className="ui info message bold h5">
                            The accordion can also accept custom html.
                        </div>
                    }
                />
                <ContractItem
                    title="Pot Manager Contract"
                    titleLink="potmanager.ethereum.ens"
                    subtitleLink={Paths.getEtherScanAddressUrl(
                        "0xf4e3adc51d711e7992623e5d779904330abeb992"
                    )}
                    subtitle="0xf4e3adc51d711e7992623e5d779904330abeb992"
                    accordionLinks={[
                        {
                            description: "Update Vars Contract",
                            link: Paths.getEtherScanAddressUrl(
                                "0xf4e3adc51d711e7992623e5d779904330abeb992"
                            ),
                            linkText: "0xf4e3adc51d711e7992623e5d779904330abeb992"
                        },
                        {
                            description: "Pot Manager Pricing",
                            link: "http://google.com",
                            linkText: "0xf4e3adc51d711e7992623e5d779904330abeb992"
                        },
                        {
                            description: "Token holder claim contract",
                            link: Paths.getEtherScanAddressUrl(
                                Settings.TOKEN_HOLDER_CLAIM_ADDRESS
                            ),
                            linkText: Settings.TOKEN_HOLDER_CLAIM_ADDRESS
                        },
                    ]}
                />
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