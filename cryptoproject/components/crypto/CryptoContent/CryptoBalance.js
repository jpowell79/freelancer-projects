import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateTradeTokens, isLoadingTradeTokens} from "../../../redux/actions";
import {LoaderSmall} from "../../icons";
import {
    definitionTable,
    titledSegmentHeader,
    titledSegmentContent
} from "../../utils/cssUtils";
import AlertOptionPane from "../../Alert/AlertOptionPane";
import Settings from '../../../site-settings';
import Web3 from "../../../server/services/Web3";

class CryptoBalance extends Component {
    constructor(props){
        super(props);

        this.accountAddress = 'undefined';
        this.fetchTradeTokens = this.fetchTradeTokens.bind(this);
    }

    fetchTradeTokens(){
        this.props.dispatch(isLoadingTradeTokens(true));

        Web3.getAccountAddress().then(accountAddress => {
            this.accountAddress = accountAddress;

            return Web3.eth.call({
                to: Settings.TOKEN_CONTRACT,
                data: `0x70a08231000000000000000000000000${accountAddress.substring(2)}`
            });
        }).then(result => {
            if(result){
                let bn = Web3.utils.toBN(result).toString();
                let tokens = parseFloat(Web3.utils.fromWei(bn, 'ether'));
                this.props.dispatch(updateTradeTokens(tokens));
            } else {
                AlertOptionPane.showErrorAlert({message: err.toString()});
            }

            this.props.dispatch(isLoadingTradeTokens(false));
        }).catch(() => {
            this.props.dispatch(isLoadingTradeTokens(false));
        });
    }

    componentWillUnmount(){
        this.props.dispatch(updateTradeTokens(null));
        this.props.dispatch(isLoadingTradeTokens(true));
    }

    componentDidMount(){
        if(this.props.tradeTokens === null){
            this.fetchTradeTokens();
        }
    }

    render(){
        if(this.props.isLoadingTradeTokens){
            return (
                <section id="crypto-balance">
                    <div className="ui top attached padded bg-color-light-gray header">
                        <h2>Your account</h2>
                    </div>
                    <div className="ui attached padded segment children-divider-md">
                        <LoaderSmall/>
                    </div>
                </section>
            );
        }

        return (
            <section id="crypto-balance">
                <div className={titledSegmentHeader()}>
                    <h2>Your account</h2>
                </div>
                <div className={titledSegmentContent('children-divider-md')}>
                    <table className={definitionTable()}>
                        <tbody>
                            <tr>
                                <td className="four wide column">
                                    Ethereum address:
                                </td>
                                <td>
                                    {this.accountAddress}
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
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    let {tradeTokens, isLoadingTradeTokens} = state;

    return {tradeTokens, isLoadingTradeTokens};
};

export default connect(mapStateToProps)(CryptoBalance);