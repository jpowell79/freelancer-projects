import React, {Component} from 'react';
import Paths from "../../utils/Paths";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateCrypto} from "../../../redux/actions";
import {CryptoStats} from "./CryptoStats";
import CryptoCountdown from './CryptoCountdown';
import CryptoTrade from "./CryptoTrade";

class CryptoContent extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.isOpen = this.isOpen.bind(this);
    }

    isOpen(){
        let {nr_of_trades} = this.props.data;
        let {
            standard_time_closes,
            extended_time_closes
        } = this.props.data;

        return (nr_of_trades < 1000) && (standard_time_closes !== 0) && (extended_time_closes !== 0);
    }

    render(){
        let {
            name,
            contract_address,
            standard_time_closes = 0,
            extended_time_closes = 0,
        } = this.props.data;

        return (
            <div id="crypto-content">
                <div className="ui padded segment items">
                    <div className="item">
                        <div className="image">
                            <img src={Paths.getCryptoIcon(name, 'medium')}/>
                        </div>
                        <div className="middle aligned content no-padding text-center">
                            <h2 className="ui huge header no-margin-top">
                                {name}
                                <div className="sub header">Status: {(this.isOpen()) ? "Open" : "Locked"}</div>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="ui segment header">
                    <h2 className="ui header no-margin-top">
                        This smart contract address is:
                        <div className="sub header"><a href={`https://etherscan.io/address/${contract_address}`}>{contract_address}</a></div>
                    </h2>
                </div>
                <div>
                    <div className="ui top attached padded bg-color-light-gray header">
                        <h2>Name: {name}</h2>
                    </div>
                    <div id="crypto-details" className="ui attached padded segment">
                        <CryptoStats {...Object.assign(this.props.data, this.props.data.quotes.USD)}/>
                        <CryptoCountdown
                            standardTimeCloses={standard_time_closes}
                            extendedTimeCloses={extended_time_closes}
                            onStandardTimeZero={() => {
                                this.props.dispatch(updateCrypto(Object.assign(this.props.data, {
                                    standard_time_closes: 0
                                })));
                            }}
                            onExtendedTimeZero={() => {
                                this.props.dispatch(updateCrypto(Object.assign(this.props.data, {
                                    extended_time_closes: 0
                                })));
                            }}
                        />
                        <CryptoTrade isOpen={this.isOpen}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(CryptoContent);