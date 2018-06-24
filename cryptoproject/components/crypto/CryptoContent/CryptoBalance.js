import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    resetAccount,
    updateAccount
} from "../../../redux/actions";
import {LoaderSmall} from "../../icons";
import {
    definitionTable,
    titledSegmentHeader,
    titledSegmentContent
} from "../../utils/cssUtils";
import AlertOptionPane from "../../Alert/AlertOptionPane";
import Settings from '../../../site-settings';
import web3 from "../../../server/services/Web3";

class CryptoBalance extends Component {
    constructor(props){
        super(props);

        this.fetchTradeTokens = this.fetchTradeTokens.bind(this);
    }

    fetchTradeTokens(){
        let address = '';
        this.props.dispatch(updateAccount({isLoading: true}));

        web3.getAccountAddress().then(accountAddress => {
            if(accountAddress === undefined) return false;

            address = accountAddress;

            return web3.eth.call({
                to: Settings.TOKEN_CONTRACT,
                data: `0x70a08231000000000000000000000000${accountAddress.substring(2)}`
            });
        }).then(result => {
            if(address !== ''){
                let bn = web3.utils.toBN(result).toString();
                let tokens = parseFloat(web3.utils.fromWei(bn, 'ether'));
                this.props.dispatch(updateAccount({
                    isLoading: false,
                    tradeTokens: tokens,
                    address: address
                }));
            } else {
                this.props.dispatch(updateAccount({isLoading: false}));
            }
        }).catch(err => {
            AlertOptionPane.showErrorAlert({message: err.toString()});
            this.props.dispatch(updateAccount({isLoading: false}));
        });
    }

    componentWillUnmount(){
        this.props.dispatch(resetAccount());
    }

    componentDidMount(){
        this.fetchTradeTokens();
    }

    render(){
        let {account} = this.props;

        if(account.isLoading){
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
                                    {(account.address === null)
                                        ? 'Could not be detected.'
                                        : account.address}
                                </td>
                            </tr>
                            <tr>
                                <td className="four wide column">
                                    Trade tokens:
                                </td>
                                <td>
                                    {account.tradeTokens}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {(account.tradeTokens > 0)
                        ? (
                            <div className="ui success message">
                                You are eligible to trade during the extended trading period.
                            </div>
                        )
                        : (
                            <div className="ui error message">
                                {(account.address === null)
                                    ? "Please check your connection to metamask."
                                    : "You are not eligible to trade during the extended trading period."}
                            </div>
                        )}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    let {account} = state;

    return {account};
};

export default connect(mapStateToProps)(CryptoBalance);