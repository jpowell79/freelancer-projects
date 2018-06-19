import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateTradeTokens, isLoadingTradeTokens} from "../../../redux/actions";
import {LoaderSmall} from "../../icons";
import AlertOptionPane from "../../Alert/AlertOptionPane";
import PropTypes from 'prop-types';
import web3 from "../../web3";

class CryptoBalance extends Component {
    static propTypes = {
        accountAddress: PropTypes.string.isRequired,
        contractAddress: PropTypes.string.isRequired
    };

    constructor(props){
        super(props);

        this.fetchTradeTokens = this.fetchTradeTokens.bind(this);
    }

    fetchTradeTokens(accountAddress, contractAddress){
        this.props.dispatch(isLoadingTradeTokens(true));
        //TODO: Check if the correct tokens are actually being fetched here.
        let contractData = `0x70a08231000000000000000000000000${accountAddress.substring(2)}`;

        web3.eth.call({
            to: contractAddress,
            data: contractData
        }, (err, result) => {
            if(result){
                let bn = web3.utils.toBN(result).toString();
                let tokens = parseFloat(web3.utils.fromWei(bn, 'ether'));
                this.props.dispatch(updateTradeTokens(tokens));
            } else {
                AlertOptionPane.showErrorAlert({message: err.toString()});
            }

            this.props.dispatch(isLoadingTradeTokens(false));
        });
    }

    componentWillUnmount(){
        this.props.dispatch(updateTradeTokens(null));
        this.props.dispatch(isLoadingTradeTokens(true));
    }

    componentDidMount(){
        if(this.props.tradeTokens === null){
            this.fetchTradeTokens(
                this.props.accountAddress,
                this.props.contractAddress
            );
        }
    }

    render(){
        if(this.props.isLoadingTradeTokens){
            return (
                <div id="crypto-balance">
                    <div className="ui top attached padded bg-color-light-gray header">
                        <h2>Your account</h2>
                    </div>
                    <div className="ui attached padded segment children-divider-md">
                        <LoaderSmall/>
                    </div>
                </div>
            );
        }

        return (
            <div id="crypto-balance">
                <div className="ui top attached padded bg-color-light-gray header">
                    <h2>Your account</h2>
                </div>
                <div className="ui attached padded segment children-divider-md">
                    <table className="ui definition table">
                        <tbody>
                            <tr>
                                <td className="four wide column">
                                    Ethereum address:
                                </td>
                                <td>
                                    {this.props.accountAddress}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    Trade tokens:
                                </td>
                                <td>
                                    {this.props.tradeTokens}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {(this.props.tradeTokens > 0)
                        ? (
                            <div className="ui success message">
                                You are eligible to trade during the extended trading period.
                            </div>
                        )
                        : (
                            <div className="ui error message">
                                You are not eligible to trade during the extended trading period.
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let {tradeTokens, isLoadingTradeTokens} = state;

    return {tradeTokens, isLoadingTradeTokens};
};

export default connect(mapStateToProps)(CryptoBalance);